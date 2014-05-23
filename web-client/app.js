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
        var DEVICE_ID = secret_device_id;
        var TOKEN = secret_access_token;

        console.log("token is " + TOKEN);

        $scope.state = true;

        $scope.toggle = function() {

            setPower(true);
        };
        
        // Set access token and content type for all requests

        $http.defaults.headers.common['access_token'] = TOKEN ;
        $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded' ;

        //TODO set CORS
        
        /**
         * Signal device to set state.
         * @param {Boolean} state
         * - true: set on
         * - false: set off
         * @return
         * - string with error message if errors
         * - null if all okay,
         */
        function setPower(state) {
            var payload = {};

            if (state) {
                payload = { 'params': 'D7,HIGH' };
            } else {
                payload = { 'params': 'D7,LOW' };
            }

            

            var url = 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/digitalwrite';
            // When putting the token in the body, content type must be application/x-www-form-urlencoded
            
            console.log('post to ' + url);
            $http.post(url, payload)
                .success(function(data, status, headers, config) {
                    console.log(status);
                    return;
                    // this callback will be called asynchronously
                     // when the response is available
                })
                .error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(status);
                    return data;
                });
            //$scope.state = !$scope.state;
        }
    }
               );
