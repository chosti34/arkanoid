<?php
    require_once 'include/common.inc.php';

    $database = new Database;

    if ((isset($_POST['user'])) && (isset($_POST['score'])))
    {
        $name = $database->dbQuote(trim($_POST['user']));
        $score = $database->dbQuote(trim($_POST['score']));

        $query = "INSERT INTO
                    player(name, score)
                  VALUES
                    ('$name', $score)";

        $database->dbQuery($query);
    }