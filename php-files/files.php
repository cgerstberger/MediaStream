<?php
	//header('Access-Control-Allow-Origin: [http://localhost, http://127.0.0.1:54714]', false);
	
	$http_origin = $_SERVER['HTTP_ORIGIN'];

	$allowed_domains = array(
	  'http://localhost',
	  'http://127.0.0.1:54714',
	);

	if (in_array($http_origin, $allowed_domains))
	{  
		header("Access-Control-Allow-Origin: $http_origin", false);
	}
	
	$files = array();
	$files[0] = array('filename' => 'Moby - Dick', 'extension' => 'mp3');
	$files[1] = array('filename' => 'People Are Awesome', 'extension' => '.mp4');
	$files[2] = array('filename' => 'Test', 'extension' => '.txt');
	echo json_encode($files);
?>