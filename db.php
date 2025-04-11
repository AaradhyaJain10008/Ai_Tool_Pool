<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "ai_tool_pool"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



?>
