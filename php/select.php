<?php
    require_once 'include/database.inc.php';

    $query = "SELECT * FROM (SELECT * FROM players ORDER BY score DESC) AS temp GROUP BY name ORDER BY score DESC";
    $result = mysqli_query($g_dbLink, $query);

    if ($result)
    {
        $i = 1;
        while ($row = mysqli_fetch_assoc($result))
        {
            echo $i . '. ' . $row['name'] . ', ' . $row['score'] . '<br />';
            $i++;
        }
        mysqli_free_result($result);
    }