<?php
require __DIR__ . '/db.php';

$pdo->exec("
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
");

// สร้างพนักงานเริ่มต้น Admin/1234 ถ้ายังไม่มี
$stmt = $pdo->prepare("SELECT COUNT(*) FROM staff WHERE username = ?");
$stmt->execute(["Admin"]);
if ($stmt->fetchColumn() == 0) {
  $ins = $pdo->prepare("INSERT INTO staff(username,password) VALUES(?,?)");
  $ins->execute(["Admin", "1234"]);
}

echo "OK: Database initialized";
