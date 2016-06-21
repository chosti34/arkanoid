<?php
    require_once '../include/database.inc.php';

    $query = mysql_query("SELECT * FROM players GROUP BY name ORDER BY score DESC LIMIT 5");

    if ($query)
    {
        $i = 1;
        while ($res = mysql_fetch_assoc($query))
        {
            echo $i . '. ' . $res['name'] . ', ' . $res['score'] . '<br />';
            $i++;
        }
    }