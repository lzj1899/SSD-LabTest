<?php
function is_valid_query($input) {
    // Allow only alphanumeric and spaces, adjust as needed
    return preg_match('/^[a-zA-Z0-9 ]{1,100}$/', $input);
}

// When user submits ?query=... from index.html
if (isset($_GET['query'])) {
    $search = $_GET['query'];

    if ($search === '' || !is_valid_query($search)) {
        header("Location: index.html");
        exit;
    } else {
        // Input is safe, redirect to result.php?q=...
        $safe = urlencode($search);
        header("Location: result.php?q={$safe}");
        exit;
    }
}

// Display result if user is redirected to ?q=...
$safeQuery = $_GET['q'] ?? '';
?>

<!DOCTYPE html>
<html>
<head>
  <title>Search Result</title>
</head>
<body>
  <h2>Search Result</h2>

  <?php if ($safeQuery): ?>
    <p>Search Query: <strong><?= htmlspecialchars($safeQuery) ?></strong></p>
  <?php else: ?>
    <p>No query to display.</p>
  <?php endif; ?>

  <p><a href="index.html">Home</a></p>
</body>
</html>
