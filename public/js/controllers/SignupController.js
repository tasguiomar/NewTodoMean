var appControllers = angular.module('app.controllers');

appControllers.controller('SignupController', function (UserService, $scope, toaster, $state) {
    $scope.user = {};

    $scope.signup = function () {
        $scope.signupError = null;
        if ($scope.user.confirmPassword !== $scope.user.password) {
            $scope.signupError = 'Password many different';
            $scope.user.confirmPassword = "";
            return;
        }
        var request_body = {
            "username": $scope.user.username,
            "email": $scope.user.email,
            "password": $scope.user.password
        };
        UserService.signup(request_body)
            .then(function (response) {
                    $state.go('login');
            }, function (error) {
                $scope.signupError = 'Username or email exist.'+'User and password length min 5';
            });
    }
});