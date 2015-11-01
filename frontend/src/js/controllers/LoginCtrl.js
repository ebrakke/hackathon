'use strict';

app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.error = '';
    $scope.loading = false;

    $scope.login = function(email, password) {
        $scope.loading = true;

        Auth.login(email, password).then(function() {
            $location.path('/feed');
        }, function(error) {
            $scope.error = error;
            $scope.loading = false;
        });
    };
});
