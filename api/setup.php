<?php
require __DIR__ . '/db.php';

// สร้างตาราง staff ถ้ายังไม่มี
$pdo->exec("CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)");

// เพิ่ม Admin ถ้ายังไม่มี
$st = $pdo->prepare("INSERT OR IGNORE INTO staff(username,password) VALUES('Admin','1234')");
$st->execute();

echo "SETUP DONE";
