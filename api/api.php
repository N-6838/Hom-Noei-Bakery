<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/db.php';

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents("php://input"), true) ?? [];

function out($ok, $data = null, $msg = "") {
  echo json_encode(["ok"=>$ok, "data"=>$data, "msg"=>$msg], JSON_UNESCAPED_UNICODE);
  exit;
}

/* ===== STAFF LOGIN ===== */
if ($action === 'staff_login') {
  $u = trim($input['username'] ?? '');
  $p = trim($input['password'] ?? '');
  $st = $pdo->prepare("SELECT id, username FROM staff WHERE username=? AND password=?");
  $st->execute([$u,$p]);
  $row = $st->fetch(PDO::FETCH_ASSOC);
  if (!$row) out(false, null, "รหัสพนักงานไม่ถูกต้อง");
  out(true, $row, "เข้าสู่ระบบพนักงานสำเร็จ");
}

/* ===== CUSTOMER LOGIN ===== */
if ($action === 'customer_login') {
  $user = trim($input['user'] ?? '');
  $pass = trim($input['password'] ?? '');

  if ($user === '' || $pass === '') out(false, null, "กรอกข้อมูลให้ครบ");

  $st = $pdo->prepare("SELECT id, username, email FROM customers 
                       WHERE (LOWER(username)=LOWER(?) OR LOWER(email)=LOWER(?)) 
                       AND password=?");
  $st->execute([$user, $user, $pass]);
  $row = $st->fetch(PDO::FETCH_ASSOC);

  if (!$row) out(false, null, "ชื่อผู้ใช้/อีเมล หรือ รหัสผ่านไม่ถูกต้อง");
  out(true, $row, "เข้าสู่ระบบสำเร็จ");
}


/* ===== PRODUCTS ===== */
if ($action === 'products_list') {
  $rows = $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
  out(true, $rows);
}

if ($action === 'product_add') {
  $name = trim($input['name'] ?? '');
  $price = intval($input['price'] ?? 0);
  $image = trim($input['image'] ?? '');
  if ($name === '' || $price <= 0) out(false, null, "ชื่อ/ราคาไม่ถูกต้อง");
  $st = $pdo->prepare("INSERT INTO products(name,price,image) VALUES(?,?,?)");
  $st->execute([$name,$price,$image]);
  out(true, ["id"=>$pdo->lastInsertId()], "เพิ่มสินค้าแล้ว");
}

if ($action === 'product_delete') {
  $id = intval($input['id'] ?? 0);
  $st = $pdo->prepare("DELETE FROM products WHERE id=?");
  $st->execute([$id]);
  out(true, null, "ลบสินค้าแล้ว");
}

/* ===== STAFF CRUD ===== */
if ($action === 'staff_list') {
  $rows = $pdo->query("SELECT id, username, created_at FROM staff ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
  out(true, $rows);
}

if ($action === 'staff_add') {
  $u = trim($input['username'] ?? '');
  $p = trim($input['password'] ?? '');
  if ($u==='' || $p==='') out(false,null,"กรอก username/password");
  try{
    $st = $pdo->prepare("INSERT INTO staff(username,password) VALUES(?,?)");
    $st->execute([$u,$p]);
    out(true,null,"เพิ่มพนักงานแล้ว");
  } catch(Exception $e){
    out(false,null,"username ซ้ำ");
  }
}

if ($action === 'staff_delete') {
  $id = intval($input['id'] ?? 0);
  $st = $pdo->prepare("DELETE FROM staff WHERE id=?");
  $st->execute([$id]);
  out(true,null,"ลบพนักงานแล้ว");
}

/* ===== CUSTOMERS ===== */
if ($action === 'customer_register') {
  $u = trim($input['username'] ?? '');
  $e = trim($input['email'] ?? '');
  $p = trim($input['password'] ?? '');
  if ($u==='' || $p==='') out(false,null,"กรอก username/password");
  try{
    $st = $pdo->prepare("INSERT INTO customers(username,email,password) VALUES(?,?,?)");
    $st->execute([$u,$e,$p]);
    out(true,null,"สมัครสมาชิกแล้ว");
  } catch(Exception $e){
    out(false,null,"username/email ซ้ำ");
  }
}

if ($action === 'customers_list') {
  $rows = $pdo->query("SELECT id, username, email, created_at FROM customers ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
  out(true,$rows);
}

if ($action === 'customer_update') {
  $id = intval($input['id'] ?? 0);
  $u = trim($input['username'] ?? '');
  $e = trim($input['email'] ?? '');
  $st = $pdo->prepare("UPDATE customers SET username=?, email=? WHERE id=?");
  $st->execute([$u,$e,$id]);
  out(true,null,"อัปเดตลูกค้าแล้ว");
}

out(false, null, "Unknown action");
