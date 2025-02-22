<?php
if (isset($_GET['url'])) {
    // Get the URL from the query parameter
    $url = $_GET['url'];

    // Ensure the URL starts with http:// or https://
    if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
        $url = "http://" . $url;
    }

    // Get the content of the target URL
    $content = file_get_contents($url);

    // Output the content, but replace URLs within the page to point to your server
    // You can also modify headers if needed
    echo $content;
} else {
    echo "No URL provided!";
}
?>
