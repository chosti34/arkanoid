<?php
    require_once 'include/common.inc.php';

    session_start();

    $auth = new Auth;

    if ((isset($_POST['login'])) && (isset($_POST['password'])))
    {
        $login = $_POST['login'];
        $password = $_POST['password'];
        if ($auth->authorize($login, $password))
        {
            header('Location: intro_page.php');
        }
        else
        {
            echo '<h3 style=\'color:red;\'>Неправильный логин и/или пароль!</h2>';
            echo '<a href=\'login_page.php\'>Попробовать заново</a>';
        }
    }