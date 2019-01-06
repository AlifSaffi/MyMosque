<?php include 'config.php';

	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);

	$email = $obj['email'];
	
	$password = $obj['password'];
	
	if($obj['email']!=""){	
	
	$result= $mysqli->query("SELECT * FROM users where email='$email' and password='$password'");
	
		if($result->num_rows==0){
			echo json_encode('Wrong Details');				
		}
		else{

			while($row = $result->fetch_assoc()) {

				$id = $row['complainantID'];
				
			}

			echo json_encode(array(
				'message'=> 'ok',
				'id' => $id
			));

						
		}
	}	
	else{
	  echo json_encode('try again');
	}

?>

