<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $username = $data['username'] ?? ''; // Can be username or email
    $password = $data['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields']);
        exit;
    }

    // Check user
    $sql = "SELECT id, username, email, password, role FROM users WHERE username = ? OR email = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $username, $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        if (password_verify($password, $row['password'])) {
            unset($row['password']); // Remove password from response
            echo json_encode(['success' => true, 'message' => 'Login successful', 'user' => $row]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }

    mysqli_stmt_close($stmt);
}
?>