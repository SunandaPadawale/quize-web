'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('mainApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin', {
        templateUrl: 'content/admin/admin.html',
        controller: 'adminCtrl'
    });
}]);

app.controller("adminCtrl", ['$scope', 'appService', '$interval', '$http', function($scope, appService, $interval, $http) {


    $scope.getQuestionAnsweList = function() {
        $scope.flagforQuize = false;
        appService.httpGet("getParticiptedCount").then(function(response) {
            if (response.result) {
                $scope.quizePartciptelist = response.quizeAnslist;
            } else {
                $scope.quizePartciptelist = [];
            }
        });
    }
    $scope.getQuestionAnsweList();

}]);