var audioPlayerVisible = false;
var audioPlayer;

String.prototype.replaceAll = function(search, replacement){
    return this.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function () {
    $("#audio-player").mediaelementplayer({
        alwaysShowControls: true,
        features: ['playpause', 'current', 'progress', 'volume', 'duration'],
        audioVolume: 'horizontal',
        success: function(media, node, player){
            audioPlayer = player;
        }
    });
});

$(document).on("click", ".divPlayButton", function () {
    var name = $(this).parent().siblings("#name").text();
    var extension = $(this).parent().siblings("#extension").text();
    var nameReplaced = name.replaceAll(" ", "%20");
    var fullname = nameReplaced + "." + extension;

    $(".divAudioName h5")[0].innerText = name;
    reloadAudioPlayer(fullname);

    $(".divPlayButton img").src = "images/icons/play/play-24.png";
    $(this).children("img").src = "images/icons/play/pause-24.png";

    showAudioPlayer();
});

function reloadAudioPlayer(fullname) {
    var $audioPlayer = $("#audio-player")[0];
    $audioPlayer.pause();
    //$audioPlayer.stop();
    //$audioPlayer.remove();
    $audioPlayer.src = "http://localhost:80/MediaStream/trunk/musicStream.php?file=" + fullname;
    $audioPlayer.load();
    $audioPlayer.play();
}

function showAudioPlayer() {
    if (!audioPlayerVisible) {
        $(".footer").css("min-height", 0).slideToggle(function () {
            $(".footer").css("min-height", "");
        });
        $mainBottom = $(".main").css("bottom");
        if ($mainBottom == "60px") {
            $(".main").animate({
                bottom: "0px"
            });
        } else {
            $(".main").animate({
                bottom: "60px"
            });
        }
        audioPlayerVisible = true;
    }
}
