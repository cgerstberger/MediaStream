<?php
	//header('Access-Control-Allow-Origin: [http://localhost, http://127.0.0.1:54714]', false);

    // if an header is needed to load the page, just allow well-known sites
    if(isset($_SERVER['HTTP_ORIGIN']))
    {
        $http_origin = $_SERVER['HTTP_ORIGIN'];

        $allowed_domains = array(
          'http://localhost',
          'http://localhost:80',
          'http://localhost/MediaStream/',
          'http://localhost:80/MediaStream/',
          'http://127.0.0.1:54714',
          'http://127.0.0.1:60037'
        );

        if (in_array($http_origin, $allowed_domains))
        {  
            header("Access-Control-Allow-Origin: $http_origin", false);
        }
    }
	
	$files = array();
	$files[0] = array('filename' => 'Moby - Dick', 'extension' => 'mp3');
	$files[1] = array('filename' => 'People Are Awesome', 'extension' => '.mp4');
	$files[2] = array('filename' => 'Test', 'extension' => '.txt');
	echo json_encode($files);
?>