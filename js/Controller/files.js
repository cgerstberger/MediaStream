var filesApp = angular.module('filesApp', []);

filesApp.controller('FileTableController', function FileTableController($scope) {
    $scope.files = [
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
});
