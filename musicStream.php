<?php
    //require_once dirname($_SERVER['DOCUMENT_ROOT'])."/htdocs/MediaStream/trunk/app/PHP-MP3-master/phpmp3.php";

    $dir = dirname($_SERVER['DOCUMENT_ROOT'])."/htdocs/MediaStream/trunk";
    $filename = $_GET['file'];
    //$start = $_GET['start'];
    $file = $dir."/".$filename;

    $extension = "mp3";
    $mime_type = "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3";

    if(file_exists($file)){
        header('Content-type: {$mime_type}');
        header('Content-length: ' . filesize($file));
        header('Content-Disposition: filename="' . $filename);
        header('X-Pad: avoid browser bug');
        //header('Cache-Control: no-cache');
        header('Content-Transfer-Encoding: binary');
        header('Accept-Ranges: bytes');
        readfile($file);
    }else{
        header("HTTP/1.0 404 Not Found");
    }
?>