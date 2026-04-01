<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input
    $full_name = htmlspecialchars(trim($_POST['full_name']));
    $student_id = htmlspecialchars(trim($_POST['student_id']));
    $major = htmlspecialchars(trim($_POST['major']));
    $batch = htmlspecialchars(trim($_POST['batch']));
    $phone_number = htmlspecialchars(trim($_POST['phone_number']));
    $email = htmlspecialchars(trim($_POST['email']));
    $motivation = htmlspecialchars(trim($_POST['motivation']));

    // Simple validation
    if (empty($full_name) || empty($student_id) || empty($major) || empty($batch) || empty($phone_number) || empty($email) || empty($motivation)) {
        die("Please fill in all required fields.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO registrations (full_name, student_id, major, batch, phone_number, email, motivation) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$full_name, $student_id, $major, $batch, $phone_number, $email, $motivation]);
        
        // Redirect to success page
        header("Location: success.html");
        exit();
    } catch (PDOException $e) {
        die("Error saving registration: " . $e->getMessage());
    }
} else {
    header("Location: registration.html");
}
?>
