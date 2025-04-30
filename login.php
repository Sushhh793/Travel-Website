<?php
$conn = new mysqli("localhost", "root", "", "wanderlust_db");

$username = $_POST['username'];
$password = $_POST['password'];

$result = $conn->query("SELECT * FROM users WHERE username='$username' AND password='$password'");
if ($result->num_rows > 0) {
    echo "Login successful!";
} else {
    echo "Invalid credentials.";
}
?>
