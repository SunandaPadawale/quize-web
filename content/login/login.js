'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('mainApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'content/login/login.html',
        controller: 'loginCtrl'
    });
}]);

app.controller("loginCtrl", ['$scope', '$rootScope', 'appService', '$interval', '$http', function($scope, $rootScope, appService, $interval, $http) {

    $scope.submitlogin = function() {
        $scope.data = {
            "username": $scope.userName,
            "password": $scope.password
        }
        appService.httpPost($scope.data, "login").then(function(response) {

            if (response.result) {
                $scope.userInfo = response.user;
                $scope.userDet = JSON.stringify($scope.userInfo);
                localStorage.setItem('userDet', $scope.userDet);
                $rootScope.userDetails = JSON.parse(localStorage.getItem('userDet'));
                console.log($rootScope.userDetails.roles[0].name);
                if ($rootScope.userDetails.roles[0].role.name == "ADMIN") {
                    window.location.href = "template.html#!/admin"
                } else {
                    window.location.href = "template.html#!/quize"
                }
                console.log($rootScope.userDetails);
            } else {
                window.alert("please enter correct username and password ");
            }
        });
    }


}]);