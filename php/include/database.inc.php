<?php
    require_once 'config.inc.php';

    $g_dbLink = null;

    function dbConnect()
    {
        global $g_dbLink;
        $g_dbLink = @mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
        $error = mysqli_connect_error();
        if ($error)
        {
            die('Unable to connect to DB');
        }
    }

    function dbQuery($query)
    {
        global $g_dbLink;
        return mysqli_query($g_dbLink, $query);
    }

    function dbQuote($value)
    {
        global $g_dbLink;
        return mysqli_real_escape_string($g_dbLink, $value);
    }