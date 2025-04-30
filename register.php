<?php
$conn = new mysqli("localhost", "root", "", "wanderlust_db");

$username = $_POST['username'];
$password = $_POST['password'];

$result = $conn->query("SELECT * FROM users WHERE username='$username'");
if ($result->num_rows > 0) {
    echo "Username already exists.";
} else {
    $conn->query("INSERT INTO users (username, password) VALUES ('$username', '$password')");
    echo "Registration successful!";
}
?>
