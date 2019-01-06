<?php include 'config.php';


	$json = file_get_contents('php://input');
 
	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	 
     // name store into $name.
    $complainantID = $obj['id']; 
    $location = $obj['location'];
    $description = $obj['description'];
	
	if($obj['id']!="") {

        $status = 'pending';
        $sql = "INSERT INTO complaint(complainantID, description, location, status) VALUES($complainantID, '$description', '$location', '$status') ";

        $result= $mysqli->query($sql);
	
	
		if($result){
			echo json_encode('complaint submitted');  // alert msg in react native		 		
		} else {	

		   echo json_encode('error submitted your complaint');
				
		}
	} else {

	    echo json_encode('try again');
	}

	
?>

