#!/bin/bash

echo -n "WARNUNG: Die vorherige Installation wird gelöscht. Fortfahren? (j/n)"
read choice
if [ $choice = "j" ]; then
  sh install_cordova.sh $1
else
  exit 0
fi
