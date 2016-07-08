<?php
    require_once 'include/common.inc.php';

    dbConnect();

    $query = "SELECT name, MAX(score) as max_score FROM player GROUP BY name ORDER BY max_score DESC LIMIT 12";
    $result = dbQuery($query);
    $str = '';

    if (($result) && (mysqli_num_rows($result) > 0))
    {
        for ($i = 1; $row = mysqli_fetch_assoc($result); $i++)
        {
            $name = htmlspecialchars(stripslashes($row['name']));
            $score = htmlspecialchars(stripslashes($row['max_score']));
            $str .= $i . '. ' . $name . ', ' . $score . '<br />'; 
        }
        mysqli_free_result($result);
    }
    elseif ($result)
    {
        $str = 'Nobody have played on this server...';
    }
    else
    {
        $str = 'Some error with database tables occurred...';
    }

    echo $str;