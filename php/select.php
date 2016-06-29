<?php
    require_once 'include/database.inc.php';

    $query = "SELECT name, MAX(score) as max_score FROM players GROUP BY name ORDER BY max_score DESC LIMIT 12";

    $result = mysqli_query($g_dbLink, $query);
    $amountOfPlayers = mysqli_num_rows($result);

    if (($result) && ($amountOfPlayers > 0))
    {
        $i = 1;
        while ($row = mysqli_fetch_assoc($result))
        {
            echo $i . '. ' . htmlspecialchars($row['name']) . ', ' . htmlspecialchars($row['max_score']) . '<br />';
            $i++;
        }
        mysqli_free_result($result);
    }
    else if ($result)
    {
        echo 'Nobody have played on this server...';
    }