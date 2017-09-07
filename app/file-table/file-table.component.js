angular
    .module('fileTable')
    .component('fileTable', {
    templateUrl: 'file-table/file-table.template.html',
    controller: function($scope, $http){
        $http.get('http://localhost/MediaStream/trunk/files.php').then(function successCallback(response){
            $scope.$ctrl.files = response.data;
        }, function errorCallback(response){
            window.alert("error");
        });
    }
});