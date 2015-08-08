(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     */
    function ListController($scope, $location, recipeService) {

        recipeService.list()
            .then(function (data) {
                $scope.items = data;
            });

        $scope.detail = function (id) {
            $location.path('/detail/' + id);
        };
    }

    app.module.controller('listController', ListController);
})();