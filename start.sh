#!/bin/bash

npm install;
npm install -g bower
(cd builds/dumbo && bower install)

if $PROD;
then gulp production;
else gulp staging;
fi
