'use strict';

app.config(function($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/pages/splash.html',
        controller: 'RootCtrl',
        transition: 'main'
    }).when('/home', {
        templateUrl: 'partials/pages/transaction.html',
        controller: 'TransactionCtrl'
    }).when('/profile', {
        templateUrl: 'partials/pages/profile.html',
        controller: 'ProfileCtrl'
    }).when('/login', {
        templateUrl: 'partials/pages/login.html',
        controller: 'LoginCtrl'
    }).when('/register', {
        templateUrl: 'partials/pages/register.html',
        controller: 'RegisterCtrl'
    });

    // Handle authentication requirements
    $httpProvider.interceptors.push(function($q, $location, $localStorage) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};

                // If auth token exists, send it with each request
                if ($localStorage.token) {
                    config.headers.Authorization = $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                // If server responds with 401, user is not authorized.
                // Send them to login page.
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
});
