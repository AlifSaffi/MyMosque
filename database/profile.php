<?php include 'config.php';

	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);

	$id = $obj['id'];
	
	
	$result= $mysqli->query("SELECT * FROM complainant WHERE complainantID=$id");
	
		
	

			while($row = $result->fetch_assoc()) {

                $id = $row['complainantID'];
                $username = $row['username'];
                $email = $row['email'];
                $password = $row['password'];
				
			}

			echo json_encode(array(
				'message'=> 'ok',
                'id' => $id,
                'username' => $username,
                'email' => $email,
                'password' => $password
			));

		

?>

