(function ($, jQuery) {
    "use strict";

    window.app = window.app || { resolver: {} };
    app.module = angular.module('recipeBook', ['ngRoute']);


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
            if(!window.isCordovaApp){
            	angular.bootstrap(document, ['recipeBook']);	
            }
        }, false);
    }

    if (window.isCordovaApp) {
        document.addEventListener('deviceready', function () {
            window.isCordovaApp = !!window.cordova;
            angular.bootstrap(document, ['recipeBook']);
            if(window.device.platform === 'windows'){
            	app.module.config( [
    				'$compileProvider',
				    function( $compileProvider )
				    {   
				        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|ms-appx):/);
				    }
				]);
            }

            if(window.cordova.file === undefined){
                if(window.device.platform === 'windows'){
                    window.cordova.file = {
                        dataDirectory: 'ms-appdata:///local/'
                    }
                }
            }
        }, false);
    }
})();