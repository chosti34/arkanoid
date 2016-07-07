<?php
    require_once 'include/database.inc.php';

    dbConnect();

    if ((isset($_POST['user'])) && (isset($_POST['score'])))
    {
        $name = dbQuote(trim($_POST['user']));
        $score = dbQuote(trim($_POST['score']));
    }

    $query = "INSERT INTO player(name, score) VALUES('$name', $score)";

    dbQuery($query);