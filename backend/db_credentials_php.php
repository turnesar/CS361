<?php

$dbhost = 'oniddb.cws.oregonstate.edu';
$dbname = 'grasleal-db';
$dbuser = 'grasleal-db';
$dbpass = '5t1NdNv8SYwTEXCZ';

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

echo 'Successfully connected to database!';

$mysqli->close();

?>