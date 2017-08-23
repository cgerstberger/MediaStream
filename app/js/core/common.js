$(document).ready(function () {
    $("#wrapper").click(function () {
        $(".footer").css("min-height", 0).slideToggle(function(){
            $(".footer").css("min-height", "");
        });
        $mainBottom = $(".main").css("bottom");
        if($mainBottom == "60px") {
            $(".main").animate({
                bottom: "0px"
            });
        } else{
            $(".main").animate({
                bottom: "60px"
            });
        }
    });
    $(".footer").click(function(){
        event.stopPropagation();
    });
    $("#audio-player").mediaelementplayer({
        alwaysShowControls: true,
        features: ['playpause', 'current', 'progress', 'volume', 'duration'],
        audioVolume: 'horizontal'
    });
});
