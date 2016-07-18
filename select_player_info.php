<?php
    require_once 'include/common.inc.php';

    $database = new Database();

    $query = "SELECT name, MAX(score) AS max_score
              FROM player 
              GROUP BY name 
              ORDER BY max_score DESC LIMIT 12";

    $data = $database->dbQueryGetDataArray($query);

    $amountOfPlayers = count($data);
    $str = '';

    if ($amountOfPlayers != 0)
    {
        for ($i = 0; $i < $amountOfPlayers; $i++)
        {
            $name = htmlspecialchars(stripslashes($data[$i]['name']));
            $score = htmlspecialchars(stripslashes($data[$i]['max_score']));
            $str .= $i + 1 . '. ' . $name . ', ' . $score . '<br />';
        }
    }
    else
    {
        $str = 'Nobody have played on this server...';
    }

    echo $str;