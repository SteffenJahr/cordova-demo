(function ($, jQuery) {
    "use strict";


    /**
     *
     * @public
     * @param {StorageService} storageService
     * @constructor
     */
    function RecipeService(storageService) {
        var recipeLocalStorageKey = 'Recipes';

        this.list = function () {
            return storageService.getAllItems(recipeLocalStorageKey).
                then(function (data) {
                    var items = data;
                    var list = [];
                    angular.forEach(Object.keys(items), function (key) {
                        list.push(items[key]);
                    });

                    return list;
                });
        };

        this.getRecipe = function (id) {
            return storageService.getItemByKey(id, recipeLocalStorageKey);
        };

        this.addRecipe = function (recipe) {
            recipe.id = (new Date()).getTime();
            return storageService.addItem(recipe.id, recipe, recipeLocalStorageKey);
        };

        this.deleteRecipe = function (id) {
            return storageService.removeItem(id, recipeLocalStorageKey);
        };

        this.updateRecipe = function (recipe) {
            return storageService.setItem(recipe.id, recipe, recipeLocalStorageKey);
        };
    }

    app.module.service('recipeService', RecipeService);
})();