'use strict';

app.controller('TransactionCtrl', function($scope) {
    $scope.selected = [];
    // $scope.transaction = {
    //     'amount': 20,
    //     'status': 'pending'
    // };

    $scope.amount = function() {
        if ($scope.transaction) {
            return $scope.transaction.amount;
        } else if ($scope.selected.length === 0) {
            return 0;
        } else {
            return $scope.selected.join('');
        }
    };

    $scope.select = function(selection) {
        if (selection === '.' && $scope.selected.indexOf('.') > -1) {
            return;
        }

        if ($scope.selected.length <= 4) {
            $scope.selected.push(selection);
        }
    };

    $scope.delete = function() {
        $scope.selected.pop();
    };
});
