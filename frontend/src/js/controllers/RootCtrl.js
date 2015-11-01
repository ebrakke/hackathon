'use strict';

app.controller('RootCtrl', function($scope, $location, Auth) {
    console.log('[isLogged]', Auth.isLogged());

    if (Auth.isLogged()) {
        $location.path('/home');
    } else {
        $location.path('/login');
    }
});
