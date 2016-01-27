#!/bin/bash

npm install;
(cd builds/dumbo && ../../node_modules/bower/lib/bin/bower install)

if $PROD;
then gulp production;
else gulp staging;
fi
