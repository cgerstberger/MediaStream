angular
    .module('fileTable')
    .component('fileTable', {
    template: '<table class="u-full-width">' + 
                    '<thead>' + 
                        '<th>Filename</th>' +
                        '<th>File-extension</th>' +
                    '</thead>' +
                    '<tbody ng-repeat="file in $ctrl.files">' +
                        '<td>{{file.filename}}</td>' +
                        '<td>{{file.extension}}</td>' +
                    '</tbody>' +
                '</table>',
    controller: //loadFilesViaAjax
    function FileTableController(){
        this.files = [
            {
                filename: 'Moby - Flower',
                extension: '.mp3'
            },
            {
                filename: 'People Are Awesome',
                extension: '.mp4'
            },
            {
                filename: 'Test',
                extension: '.txt'
            }
        ];
    }
});

function loadFilesFromServer(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readystate == 4 && this.status == 200){
            var objArr = JSON.parse(this.responseText);
            this.files = objArr;
        }
    };
    xmlhttp.open("GET", "http://localhost:80/MediaStream/files.php", true);
    xmlhttp.send();
}

function loadFilesViaAjax(){
    var t = this;
    $.ajax({
        url: 'http://localhost:80/MediaStream/files.php',
        async: true,
        dataType: 'json'
    }).done(function(data){
        t.files = data;
        window.alert("loaded");
    });
}