'use strict';

/* Inject modules and set up url routings */
angular.module("myApp", ['ngRoute'])
.config(['$routeProvider',
         function($routeProvider) {
             $routeProvider
             .when('/', {
                 templateUrl: 'ui.html',
                 controller: 'UiController'
             })
             /* Other urls redirect to main page */
             .otherwise({
                 redirectTo: '/'
             });
         }
        ])
.controller('UiController', function ($scope) {

    $scope.state = true;

    $scope.toggle = function() {
        $scope.state = !$scope.state;
    }
});
