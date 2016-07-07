<?php
    function formStringOfTopPlayer($id, $name, $score)
    {
        return $id . ', ' . htmlspecialchars(stripslashes($name)) . ', ' . htmlspecialchars(stripslashes($score)) . '<br />';
    }