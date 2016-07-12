<?php
    require_once 'config.inc.php';

    class Database
    {
        public $dbLink = null;

        public function __construct()
        {
            $this->connect();
        }

        public function connect()
        {
            $this->dbLink = @mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
            $error = mysqli_connect_error();
            if ($error)
            {
                die('Unable to connect to database');
            }
        }

        public function getArrayOfData($query)
        {
            $data = array();
            $result = mysqli_query($this->dbLink, $query);
            if ($result)
            {
                while ($row = mysqli_fetch_assoc($result))
                {
                    array_push($data, $row);
                }
                mysqli_free_result($result);
            }
            else
            {
                die('Some error with database tables occurred...');
            }
            return $data;
        }

        public function query($query)
        {
            return mysqli_query($this->dbLink, $query);
        }

        public function quote($value)
        {
            return mysqli_real_escape_string($this->dbLink, $value);
        }
    }