'use strict';

angular.module("myApp", ['ngRoute'])
// Set routing
    .config(function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'ui.html',
                controller: 'UiController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
// Application logic
    .controller('UiController', function ($scope, $http) {
        var DEVICE_ID = secret_device_id;
        var TOKEN = secret_access_token;

        console.log("token is " + TOKEN);

        $scope.state = true;

        /**
         * Signal device to set state.
         * @param {Boolean} state
         * - true: electricity set on
         * - false: set off
         * @return
         * - string with error message if errors
         * - null if all okay,
         */
        $scope.setPower = function(state) {
            console.log('Setting power to ' + state);
            $scope.toState = state;

            var params;
            var relay_pin = 'D7'; //TODO for deployment set to D7 

            if (state) {
                params = relay_pin + ',LOW';
            } else {
                params = relay_pin + ',HIGH';
            }

            var url = 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/digitalwrite';
            var xsrf = $.param({params: params,access_token: TOKEN});
            console.log('Payload: ' + xsrf);
            $http({
                url: url,
                method: "POST",
                data: xsrf,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status, headers, config) {
                console.log(status);
                console.log(JSON.stringify(data, null, ' '));
                if (data.return_value == 1){
                    $scope.state = $scope.toState;
                    $scope.error = null;
                } else {
                    //TODO better error handling
                    console.log('Errors setting state..');
                    $scope.error = data;
                    if (data.connected != true){
                        $scope.connectionError = data;
                    }
                }
            }).error(function(data, status, headers, config) {
                $scope.error = data;
            });
        };
    });
