'use strict';

var app = angular.module('mainApp.quize', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/quize', {
        templateUrl: 'content/quize/quize.html',
        controller: 'quizeCtrl'
    });
}]);

app.controller("quizeCtrl", ['$scope', '$rootScope', 'appService', '$interval', '$http', function($scope, $rootScope, appService, $interval, $http) {
    $scope.quizeAnswer = {};
    $scope.getQuestionList = function() {
        appService.httpGet("getQuizeQuestion").then(function(response) {
            if (response.result) {
                $scope.questionList = response.quizelist;
            } else {
                $scope.questionList = [];
            }
        });
    }
    $scope.getQuestionList();

    $scope.getQuestionAnsweList = function() {
        $scope.flagforQuize = false;
        if ($scope.userDetails != null && $scope.userDetails != undefined) {
            appService.httpGet("getQuesAns" + "/ " + $scope.userDetails.id).then(function(response) {
                if (response.result) {
                    $scope.quizeAnslist = response.quizeAnslist;
                    for (let index = 0; index < $scope.quizeAnslist.length; index++) {
                        if ($scope.userDetails.id = $scope.quizeAnslist[index].user.id) {
                            $scope.flagforQuize = true;
                        }
                    }
                } else {
                    $scope.quizeAnslist = [];
                }
            });
        }

    }
    $scope.getQuestionAnsweList();

    $scope.addOrUpdateRequestList = function() {
        $scope.questionAnsList = [];
        for (let index = 0; index < $scope.questionList.length; index++) {

            $scope.questionAnsList.push({
                question: { id: $scope.questionList[index].id },
                user: { id: $rootScope.userDetails.id },
                answer: $scope.questionList[index].answer,
            });
        }
        appService.httpPost($scope.questionAnsList, "submitQuizeAnswer").then(function(response) {
            if (response.result) {
                window.alert("Answer Submitted Succesfuly");
                window.location.href = "template.html#!/login"
            } else {}
        });
    }
}]);