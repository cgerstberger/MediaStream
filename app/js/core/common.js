$(document).ready(function () {
    /*$("#wrapper").click(function () {
        $(".footer").css("min-height", 0).slideToggle(function(){
            $(".footer").css("min-height", "");
        });
    });*/
    $(".footer").click(function(){
        event.stopPropagation();
    });
    $("#audio-player").mediaelementplayer({
        alwaysShowControls: true,
        features: ['playpause', 'current', 'progress', 'volume', 'duration'],
        audioVolume: 'horizontal'
    });
});
