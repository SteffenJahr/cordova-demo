(function ($, jQuery) {
    "use strict";

    /**
     *
     * @public
     * @param $scope
     * @param $location
     * @param $routeParams
     * @param {RecipeService} recipeService
     * @constructor
     */
    function AddEditController($scope, $location, $window, $routeParams, recipeService) {
        $scope.isCordovaApp = $window.isCordovaApp;
        $scope.recipe = {};

        if ($routeParams.recipeId) {
            recipeService.getRecipe($routeParams.recipeId)
                .then(function (data) {
                    $scope.recipe = data;
                });
        }

        $scope.takePicture = function () {
            $window.navigator.camera.getPicture(function (imageURI) {
                $scope.recipe.image = imageURI;
            }, function (message) {
                console.log(message);
            });
        };

        $scope.save = function () {
            if ($scope.recipeForm.$valid) {
                var promise;
                if ($scope.recipe.id) {
                    promise = recipeService.updateRecipe($scope.recipe);
                }
                else {
                    promise = recipeService.addRecipe($scope.recipe);
                }

                promise.then(function () {
                    $location.path('/list');
                });
            }
        };
    }

    app.module.controller('addEditController', AddEditController);
})();