(function ($, jQuery) {
    "use strict";

    /***
     *
     * @param $scope
     * @param $location
     * @param $routeParams
     * @param {RecipeService} recipeService
     * @constructor
     */
    function DetailController($scope, $location, $routeParams, recipeService) {
        recipeService.getRecipe($routeParams.id)
            .then(function (data) {
                $scope.item = data;
            });

        $scope.edit = function (id) {
            $location.path('/edit/' + id);
        };

        $scope.delete = function (id) {
            recipeService.deleteRecipe(id)
                .then(function () {
                    $location.path('/list');
                });
        };
    }

    app.module.controller('detailController', DetailController);
})();