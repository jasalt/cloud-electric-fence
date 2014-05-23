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
  .controller('UiController', function ($scope, $http) {
    console.log("token is " + secret_access_token);
    $scope.state = true;

    $scope.toggle = function() {
      $http({method: 'GET', url: '/someUrl'}).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      //$scope.state = !$scope.state;
    };
  }
             );
