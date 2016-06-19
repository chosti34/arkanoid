<?php
    echo 'Привет';
    $server = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'Arkanoid';

    mysql_connect($server, $user, $password) or die(mysql_error());
    mysql_select_db($database) or die(mysql_error());
    
    $player = trim(strip_tags($_POST['user']));
    $score  = trim(strip_tags($_POST['score']));
    
    $sql = "insert into Players(player,score) values('$player', $score)";
    
    
    mysql_query($sql);
    
    $sql = "select * from Players";
    
    $result = mysql_query($sql);
    
    while ($row = mysql_fetch_array($result))
    {
        echo "<p>" . $row['player'] . "</p>";
    }
?>