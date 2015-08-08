(function ($, jQuery) {
    "use strict";

    /**
     *
     * @param $scope
     * @param $location
     * @constructor
     */
    function AppController($scope, $location) {

        $scope.home = function () {
            $location.path('/');
        };

        $scope.info = function () {
            $location.path('/info');
        };

        $scope.add = function(){
          $location.path('/add');
        };

        $scope.toggle = function () {
            $scope.toggled = !$scope.toggled;
        };

        $scope.$on('$locationChangeSuccess', function () {
            $scope.toggled = false;
        });
    }

    app.module.controller('appController', AppController);
})();