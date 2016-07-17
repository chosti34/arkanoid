<?php
    require_once 'common.inc.php';

    class Auth
    {
        private $registeredLogin = 'arkanoid';
        private $registeredPassword = '1234';

        public function authorize($login, $password)
        {
            if (($login == $this->registeredLogin) && ($password == $this->registeredPassword))
            {
                $_SESSION['isAuth'] = true;
                $_SESSION['login'] = $login;
                return true;
            }
            else
            {
                $_SESSION['isAuth'] = false;
                return false;
            }
        }

        public function logout()
        {
            $_SESSION = array();
            session_destroy();
        }

        public function isAuthorized()
        {
            if (isset($_SESSION['isAuth']))
            {
                return $_SESSION['isAuth'];
            }
            else
            {
                return false;
            }
        }

        public function getCurrentLogin()
        {
            if ($this->isAuthorized())
            {
                return $_SESSION['login'];
            }
        }
    }