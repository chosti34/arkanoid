<?php
    require_once 'include/database.inc.php';

    $queryAll = "SELECT * FROM players";
    $resultOfQueryAll = mysqli_query($g_dbLink, $queryAll);
    $amountOfPlayers = mysqli_num_rows($resultOfQueryAll);

    $mainQuery = "SELECT * FROM (SELECT * FROM players ORDER BY score DESC) AS temp GROUP BY name ORDER BY score DESC LIMIT 12";
    $result = mysqli_query($g_dbLink, $mainQuery);

    if (($result) && ($amountOfPlayers > 0))
    {
        $i = 1;
        while ($row = mysqli_fetch_assoc($result))
        {
            echo $i . '. ' . $row['name'] . ', ' . $row['score'] . '<br />';
            $i++;
        }
        mysqli_free_result($result);
    }
    else if ($result)
    {
        echo 'Nobody have played on this server...';
    }