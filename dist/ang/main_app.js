'use strict';
var app = angular.module('mainApp', [
    'ngRoute',
    'mainApp.login',
    'mainApp.quize',
    'mainApp.admin'
])

.config(['$locationProvider', '$routeProvider', '$controllerProvider', function($locationProvider, $routeProvider, $controllerProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({ redirectTo: '/login' });

}]);
app.service('appService', function($http, $q, $timeout) {
    var response = {};
    this.httpGet = function(url) {
        var d = $q.defer();
        $http({
                method: 'GET',
                url: appDomain + url,
                timeout: 60000
            })
            .then(function(response) {
                d.resolve(response.data);
            })
            .catch(function(error) {
                d.resolve(error.data);
            });
        return d.promise;
    }
    this.httpPost = function(data, url) {
        var d = $q.defer();
        $http({
                method: 'POST',
                url: appDomain + url,
                data: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': Auth.getToken()
                },
                timeout: 180000 // request timeout is set to 60 seconds
            })
            .then(function(response) {
                d.resolve(response.data);
            })
            .catch(function(error) {
                d.resolve(error.data);
            });
        return d.promise;
    }
});