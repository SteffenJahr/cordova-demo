(function ($, jQuery) {
    "use strict";

    app.module.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/list/list.html',
                controller: 'listController'
            })
            .when('/add', {
                templateUrl: 'app/add_edit/add_edit.html',
                controller: 'addEditController'
            })
            .when('/edit/:recipeId', {
                templateUrl: 'app/add_edit/add_edit.html',
                controller: 'addEditController'
            })
            .when('/info', {
                templateUrl: 'app/info/info.html',
                controller: 'infoController'
            })
            .when('/detail/:id', {
                templateUrl: 'app/detail/detail.html',
                controller: 'detailController'
            })
            .otherwise({ redirectTo: "/" });
    });
})();