<?php

session_start(); // Start the session to use session variables.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Function to establish database connection
function connectToDatabase() {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $database = "gymdb";
    $port = 8889; // MySQL port in MAMP

    $conn = new mysqli($servername, $username, $password, $database,  $port);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

// Function to check if username already exists
function checkUsernameExists($conn, $username) {
    $checkUser = "SELECT username FROM users WHERE username = '$username'";
    $result = $conn->query($checkUser);
    return $result->num_rows > 0;
}

// Function to register a new user
function registerUser($conn, $username, $password, $firstname, $surname, $date_of_birth, $email, $mobile) {
    // Get the current date in yyyy/mm/dd format
    $currentDate = date("Y/m/d");

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert data into the database
    $sql = "INSERT INTO users (username, password, firstname, surname, date_of_birth, email, mobile, date_recorded)
            VALUES ('$username', '$hashedPassword', '$firstname', '$surname', '$date_of_birth' , '$email', '$mobile', '$currentDate')";

    if ($conn->query($sql) === TRUE) {
        return $conn->insert_id; // Return the user ID
    } else {
        return false; // Registration failed
    }
}

// Main logic to process the registration form
function processRegistrationForm() {
    $conn = connectToDatabase();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $firstname = $_POST["firstname"];
        $surname = $_POST["surname"];
        $date_of_birth = $_POST["date_of_birth"];
        $email = $_POST["email"];
        $mobile = $_POST["mobile"];

        if (checkUsernameExists($conn, $username)) {
            $_SESSION['error_message'] = "Username already exists. Please choose another.";
            header("Location: register_form.php");
            exit;
        } else {
            $userID = registerUser($conn, $username, $password, $firstname, $surname, $date_of_birth, $email, $mobile);
            if ($userID) {
                $_SESSION['user_id'] = $userID; // Store the user ID in session to use later
                $_SESSION['username'] = $username; // Set the username in the session
                header("Location: dashboard.php");
                exit;
            } else {
                $_SESSION['error_message'] = "Error registering user.";
            }
        }
    }

    $conn->close();
}

// Call the function to process the registration form
processRegistrationForm();

?>
