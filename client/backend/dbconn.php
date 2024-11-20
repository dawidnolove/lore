<?php

$host       = 'localhost:3306';
$username   = 'root';
$password   = '';
$dbname     = 'lore_connect';

$db = new mysqli($host, $username, $password, $dbname);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}



#try {
 #   $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  #  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
#} catch (PDOException $e) {
 #   echo "Połączenie z bazą nie powiodło się: " . $e->getMessage();
  #  exit;
#}
?>