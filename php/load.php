<?php
    $server   = 'localhost';
    $user     = 'root';
    $password = '';
    $database = 'arkanoid';

    mysql_connect($server, $user, $password) or die(mysql_error());
    mysql_select_db($database) or die(mysql_error());

    $q = mysql_query("SELECT * FROM players GROUP BY name ORDER BY score DESC LIMIT 5");
    while ($res = mysql_fetch_assoc($q))
    {
        echo $res['name'] . ' ' . $res['score'] . '<br />';
    }