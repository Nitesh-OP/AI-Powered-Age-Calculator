<?php
// Database connection
$servername = "sql206.infinityfree.com";
$username = "if0_38000297";  // Your MySQL username
$password = "cfZfRovyBs8zAo4";  // Your MySQL password
$dbname = "if0_38000297_age_calculator";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the posted data from the form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $birthdate = $_POST['birthdate'];
    $email = $_POST['email'];

    // Calculate the age and time intervals
    $birthDateObj = new DateTime($birthdate);
    $today = new DateTime();
    $ageInterval = $today->diff($birthDateObj);

    $age = $ageInterval->y;
    $months = $ageInterval->m + ($age * 12);
    $weeks = floor($ageInterval->days / 7);
    $days = $ageInterval->days;
    $hours = $ageInterval->h;
    $minutes = $ageInterval->i;
    $seconds = $ageInterval->s;

    // Insert the data into the database
    $sql = "INSERT INTO user_data (birthdate, email, age, months, weeks, days, hours, minutes, seconds)
            VALUES ('$birthdate', '$email', $age, $months, $weeks, $days, $hours, $minutes, $seconds)";

    if ($conn->query($sql) === TRUE) {
        echo "Data saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>