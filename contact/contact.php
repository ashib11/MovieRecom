<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);


    $file = fopen("contact_data.txt", "a");
    fwrite($file, "Name: $name\nEmail: $email\nMessage: $message\n---\n");
    fclose($file);

    echo "<h2>Thank you for contacting us, $name!</h2>";
    echo "<p>Your message has been received.</p>";
    echo '<a href="contact.html">Go back</a>';
} else {
    echo "Invalid request.";
}
?>
