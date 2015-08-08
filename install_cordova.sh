#!/bin/bash

if [ -z $1 ]; then
    echo "Bitte eine Zielplattform (Android, iOS) angeben."
    exit -1
fi

npm install

rm -r cordova_build

mkdir cordova_build

chmod +x Hooks/beforeprepare/incrementBuildNumber.js

cd cordova_build

../node_modules/.bin/cordova create recipeBook com.example.recipe recipeBook --link-to=../Application

cd recipeBook

../../node_modules/.bin/cordova platform add $1

../../node_modules/.bin/cordova plugin add cordova-plugin-device

../../node_modules/.bin/cordova plugin add cordova-plugin-file

../../node_modules/.bin/cordova plugin add cordova-plugin-camera

if [ $1 = "android" ]; then
    ../../node_modules/.bin/cordova plugin add cordova-plugin-crosswalk-webview
fi

cp -r ../../Hooks .
cp -r ../../Merges .


echo "Installation beendet."
