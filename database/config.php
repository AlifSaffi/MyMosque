<?php 

$host = "localhost";
$user = "root";
$pass = "";
$name = "mymosque";


$mysqli = new mysqli_connect($host, $user, $pass, $name);

if($mysqli){
    
    echo "successfully connected..";
} else {
    
    die('connection failed'.mysqli->errno);
}


?>