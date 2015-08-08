@ECHO off
set OS="%~1"
SET /p CONTINUE=WARNUNG: Die vorherige Installation wird geloescht. Fortfahren? (j/n)?
IF "%CONTINUE%" == "j" (
    GOTO CHECKOS
) ELSE (
	GOTO FINISH
)

:CHECKOS
IF [%1] ==  [] (
    ECHO "Bitte eine Zielplattform (Android, wp8) angeben."
	GOTO FINISH
) ELSE (
	GOTO INSTALL
)

:INSTALL
call npm install
rmdir /S /Q cordova_build
mkdir cordova_build
cd cordova_build
call ..\node_modules\.bin\cordova create recipeBook com.example.recipe recipeBook --link-to=..\Application
cd recipeBook
call ..\..\node_modules\.bin\cordova platform add %OS%
call ..\..\node_modules\.bin\cordova plugin add cordova-plugin-device
call ..\..\node_modules\.bin\cordova plugin add cordova-plugin-file
call ..\..\node_modules\.bin\cordova plugin add cordova-plugin-camera

call xcopy ..\..\Merges merges /s /i
call xcopy ..\..\Hooks hooks /s /i

call ..\..\node_modules\.bin\cordova prepare

IF "%~1" == "android" (
	cd ..\..
    CALL ..\..\node_modules\.bin\cordova plugin add cordova-plugin-crosswalk-webview
) ELSE (
	cd ..\..
	GOTO FINISH
)

:FINISH
ECHO Installation beendet