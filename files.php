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

    //echo json_encode(scandir('/xampp/htdocs/MediaStream/trunk/app/Media'));

    $mediaFiles = array();
    $allDirFiles = scandir('/xampp/htdocs/MediaStream/trunk/app/Media');
    $dirFiles = array_diff($allDirFiles, array('.', '..')); // remove the parent and current directory entry
    $dirFiles = array_values($dirFiles); // converting from associative array to indexed array (using just values)
    for($i = 0; $i < count($dirFiles); $i ++)
    {
        $dirFile = $dirFiles[$i];
        $filename = substr($dirFile, 0, strrpos($dirFile, '.')); // takes the substring from position 0 to the position of the last '.'
        $extension = strtolower(substr(strrchr($dirFile, '.'), 1)); // substr needed to cut away the '.' | strrchr returns the substring from the last '.' to the end of $dirFile | strtolower to always show low file extensions
        $mediaFiles[$i] = array('filename' => $filename, 'extension' => $extension);
    }
    echo json_encode($mediaFiles);
	
	/*$files = array();
	$files[0] = array('filename' => 'Moby - Dick', 'extension' => 'mp3');
	$files[1] = array('filename' => 'People Are Awesome', 'extension' => '.mp4');
	$files[2] = array('filename' => 'Test', 'extension' => '.txt');
	echo json_encode($files);*/
?>