<?php
    require_once 'config.inc.php';

    mysql_connect(DB_HOST, DB_USER) or die(mysql_error());
    mysql_select_db(DB_NAME) or die(mysql_error());