<?php
// api/db.php
$dbPath = __DIR__ . '/../data/homnoei.sqlite';
if (!file_exists(dirname($dbPath))) {
  mkdir(dirname($dbPath), 0777, true);
}

$pdo = new PDO("sqlite:" . $dbPath);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
