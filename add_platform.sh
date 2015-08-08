#!/bin/bash

cd cordova_build

cd recipeBook

../../node_modules/.bin/cordova platform add $1

if [ $1 = "android" ]; then
    ../../node_modules/.bin/cordova plugin add cordova-plugin-crosswalk-webview
fi
