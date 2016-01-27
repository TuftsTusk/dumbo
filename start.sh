#!/bin/bash

npm install;
(cd builds/dumbo && bower install)

if $PROD;
then gulp production;
else gulp staging;
fi
