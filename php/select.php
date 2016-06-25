<?php
    require_once 'include/database.inc.php';

    $query = "SELECT * FROM players GROUP BY name ORDER BY score DESC LIMIT 5";

    $result = mysqli_query($g_dbLink, $query);

    if ($result)
    {
        $i = 1;
        while ($row = $result -> fetch_assoc())
        {
            echo $i . '. ' . $row['name'] . ', ' . $row['score'] . '<br />';
            $i++;
        }
    }