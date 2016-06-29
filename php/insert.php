<?php
    require_once 'include/database.inc.php';

    $name = mysqli_escape_string($g_dbLink, trim($_POST['user']));
    $score = mysqli_escape_string($g_dbLink, trim($_POST['score']));

    $query = "INSERT INTO players(name, score) VALUES('$name', $score)";

    mysqli_query($g_dbLink, $query);