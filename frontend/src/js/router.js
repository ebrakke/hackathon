'use strict';

app.config(function($routeProvider) {
    $routeProvider.when('/foo', {
        templateUrl: 'partials/pages/splash.html',
        controller: 'RootCtrl',
        transition: 'main'
    }).when('/', {
        templateUrl: 'partials/pages/transaction.html',
        controller: 'TransactionCtrl'
    });
});
