'use strict';

app.controller('RegisterCtrl', function($scope, $location, User, Auth) {
    $scope.user = new User();
    $scope.error = '';
    $scope.loading = false;

    $scope.register = function() {
        $scope.loading = true;

        $scope.user.create().then(function(data) {
            Auth.setToken(data.bantrsAuth);
            Auth.setUser(data.user);

            $location.path('/home');
        }, function(error) {
            $scope.error = error;
        }).finally(function() {
            $scope.loading = false;
        });
    };
});
