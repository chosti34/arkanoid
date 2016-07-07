<?php
    require_once 'include/database.inc.php';

    dbConnect();

    $query = "SELECT name, MAX(score) as max_score FROM player GROUP BY name ORDER BY max_score DESC LIMIT 12";
    $result = dbQuery($query);

    if ($result)
    {
        $amountOfPlayers = mysqli_num_rows($result);
        if ($amountOfPlayers > 0)
        {
            for ($i = 1; $row = mysqli_fetch_assoc($result); $i++)
            {
                echo $i . '. ' . htmlspecialchars(stripslashes($row['name'])) . ', ' . htmlspecialchars(stripslashes($row['max_score'])) . '<br />';
            }
            mysqli_free_result($result);
        }
        else
        {
            echo 'Nobody have played on this server...';
        }
    }
    else
    {
        echo 'Some error with database tables occurred...';
    }