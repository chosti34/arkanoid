<?php
    require_once 'include/database.inc.php';

    dbConnect();

    $name = dbQuote(trim($_POST['user']));
    $score = dbQuote(trim($_POST['score']));

    $query = "INSERT INTO players(name, score) VALUES('$name', $score)";

    dbQuery($query);