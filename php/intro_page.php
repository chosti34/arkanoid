<?php
    require_once 'include/common.inc.php';

    session_start();

    $auth = new Auth;

    if (isset($_GET['is_exit']))
    {
        if ($_GET['is_exit'] == 1)
        {
            $auth->logout();
            header('Location: ?is_exit=0');
        }
        else if ($_GET['is_exit'] == 0)
        {
            header('Location: login_page.php');
        }
    }

    if ($auth->isAuthorized())
    {
        echo 'Добро пожаловать, ' . $auth->getCurrentLogin() . '!' . '<br />';
        echo '<a href=\'?is_exit=1\'>Выйти</a>';
    }