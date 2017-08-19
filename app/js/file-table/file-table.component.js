angular
    .module('fileTable')
    .component('fileTable', {
    templateUrl: 'js/file-table/file-table.template.html',
    controller: function($scope, $http){
        $http.get('http://localhost/MediaStream/trunk/files.php').then(function successCallback(response){
            $scope.$ctrl.files = response.data;
        }, function errorCallback(response){
            window.alert("error");
        });
    }
     //loadFilesViaAjax
    /*function FileTableController(){
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
    }*/
});

function loadFilesFromServer(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readystate == 4 && this.status == 200){
            var objArr = JSON.parse(this.responseText);
            this.files = objArr;
        }
    };
    xmlhttp.open("GET", "http://localhost:80/MediaStream/trunk/files.php", true);
    xmlhttp.send();
}

function loadFilesViaAjax(){
    var t = this;
    $.ajax({
        url: 'http://localhost:80/MediaStream/trunk/files.php',
        async: true,
        dataType: 'json'
    }).done(function(data){
        t.files = data;
        window.alert("loaded");
    });
}