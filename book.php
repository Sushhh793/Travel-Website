<?php
$conn = new mysqli("localhost", "root", "", "wanderlust_db");

$place = $_POST['place'];
$name = $_POST['name'];
$email = $_POST['email'];
$guests = $_POST['guests'];
$date = $_POST['date'];

$conn->query("INSERT INTO bookings (place, name, email, guests, date) VALUES ('$place', '$name', '$email', '$guests', '$date')");

echo "Booking successful!";
?>
