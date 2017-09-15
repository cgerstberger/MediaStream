var audioPlayerVisible = true;

var context;
var sourceNode;
var audioPlaying = false;

var audioTimer;
var audioCurrentTime = 0;
var audioDuration = 0;
var audioTimeLoadOffset = 0;

var hoverVolumeIcon = false;
var hoverVolumeBar = false;

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function () {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    } catch (e) {
        alert("Web Audio API is not supported in this browser.")
    }

    $(".audioVolumeIcon").hover(function () {
        $("#audioVolumeBar").animate({
            'height': "62px",
            'top': "-80px",
            'border-width': "1px",
            'padding': "9px 9px"
        }, 200, function () {

        });
        hoverVolumeIcon = true;
    }, function () {
        hoverVolumeIcon = false;
        /*if (!hoverVolumeBar && !hoverVolumeIcon) {
            $("#audioVolumeBar").animate({
                'height': "0px",
                'top': "0px",
                'border-width': "0px"
            }, 200);
        }*/
    });
    $("#audioVolumeBar").hover(function () {
        hoverVolumeBar = true;
    }, function () {
        hoverVolumeBar = false;
        if (!hoverVolumeBar && !hoverVolumeIcon) {
            $("#audioVolumeBar").animate({
                'height': "0px",
                'top': "0px",
                'border-width': "0px",
                'padding': "0px 9px"
            }, 200);
        }
    });

    $("#audioPlayPause > div").click(function () {
        startStopAudio();
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
    stopAudio();

    var url = "http://localhost:80/MediaStream/trunk/musicStream.php?file=" + fullname;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            if (sourceNode != null)
                sourceNode.disconnect();
            sourceNode = context.createBufferSource();
            sourceNode.buffer = buffer;
            sourceNode.connect(context.destination);
            sourceNode.onended = audioEnded;
            sourceNode.start(0);
            audioTimeLoadOffset = context.currentTime;
            audioCurrentTime = 0;
            startAudio();
        }, function () {
            alert("error");
        });
    };
    request.send();
}

function audioEnded(){
    stopAudio();
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

function startStopAudio() {
    if (context != null) {
        if (context.state == "running") // states = {"running", "suspended", "closed"}
            stopAudio();
        else if (context.state == "suspended")
            startAudio();
        else
            alert("Cannot play audio, because the AudioContext is already closed.")
    }
}

function startAudio() {
    context.resume();
    audioTimer = setInterval(tickAudio, 1000);
    $("#audioPlayPause > div").addClass("audioPauseIcon").removeClass("audioPlayIcon");
}

function stopAudio() {
    context.suspend();
    clearInterval(audioTimer);
    $("#audioPlayPause > div").addClass("audioPlayIcon").removeClass("audioPauseIcon");
}

function tickAudio(){
    audioCurrentTime ++;
    console.log("Context.CurrentTime:" + context.currentTime);
    console.log("AudioCurrentTime:" + audioCurrentTime);
    console.log("Offset:" + audioTimeLoadOffset);
    
    setCurrentAudioTime();
    refreshAudioTimeProgressBar();
    
}

function setCurrentAudioTime(){
    $("#audioCurrentTime")[0].innerText = convertSecondsToHHMMSS(audioCurrentTime);
}

function convertSecondsToHHMMSS(timeInSeconds){
    var curTime = timeInSeconds;
    var hours = Math.floor(curTime / 3600);
    curTime -= hours * 3600;
    var minutes = Math.floor(curTime / 60);
    curTime -= minutes * 60;
    var seconds = curTime % 60;
    
    var hourString = hours > 0 ? (hours < 10 ? "0" + hours : hours) + ":" : "";
    if(minutes < 10) minutes = "0" + minutes;
    if(seconds < 10) seconds = "0" + seconds;
    
    return hourString + minutes + ":" + seconds;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    return convertSecondsToHHMMSS(sec_num);
}

function refreshAudioTimeProgressBar(){
    var duration = Math.floor(sourceNode.buffer.duration);
    var timeBarWidth = $("#audioTimeBar").width();
    var widthOfSecond = timeBarWidth / duration;
    $("#audioTimeProgress").css("width", audioCurrentTime * widthOfSecond);
}

