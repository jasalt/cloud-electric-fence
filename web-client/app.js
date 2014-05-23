'use strict';

angular.module("myApp", ['ngRoute'])
    .config(function($routeProvider, $httpProvider) {
        // Set routings
        $routeProvider
            .when('/', {
                templateUrl: 'ui.html',
                controller: 'UiController'
            })
        /* Other urls redirect to main page */
            .otherwise({
                redirectTo: '/'
            });

        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
    })

    .controller('UiController', function ($scope, $http) {
        var DEVICE_ID = secret_device_id;
        var TOKEN = secret_access_token;

        console.log("token is " + TOKEN);

        $scope.state = true;

        $scope.toggle = function() {

            setPower(true);
        };

        // Set access token and content type for all requests

        //$http.defaults.headers.common['access_token'] = TOKEN;
        $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded' ;
        // delete $http.defaults.headers.common['X-Requested-With'];
        // $http.defaults.useXDomain = true;


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

            // if (state) {
            //     payload = { 'params': 'D7,HIGH' };
            // } else {
            //     payload = { 'params': 'D7,LOW' };
            // }

            var url = 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/digitalwrite';
            // When putting the token in the body, content type must be application/x-www-form-urlencoded

            console.log('post to ' + url);
            // $http.post(url, payload)
            //     .success(function(data, status, headers, config) {
            //         console.log(status);
            //         return;
            //         // this callback will be called asynchronously
            //         // when the response is available
            //     })
            //     .error(function(data, status, headers, config) {
            //         // called asynchronously if an error occurs
            //         // or server returns response with an error status.
            //         console.log(status);
            //         return data;
            //     });
            var xsrf = $.param({params: "D7,LOW",access_token: TOKEN});
            $http({
                url: url,
                method: "POST",
                data: xsrf,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(response) {  
                $scope.response = response;
                console.log(JSON.stringify(response, null, ' '));
            }).error(function(error) {
                $scope.error = error;
            });
            //$scope.state = !$scope.state;
        }
    }
               )
;






