<?php
    $server   = 'localhost';
    $user     = 'root';
    $password = '';
    $database = 'arkanoid';

    mysql_connect($server, $user, $password) or die(mysql_error());
    mysql_select_db($database) or die(mysql_error());

    $name = trim(strip_tags($_POST['user']));
    $score  = trim(strip_tags($_POST['score']));

    $sql = "insert into players(name, score) values('$name', $score)";

    mysql_query($sql);