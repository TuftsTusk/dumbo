#!/bin/bash

sudo npm install
sudo npm install -g bower
bower install

if $PROD;
then gulp production;
else gulp staging;
fi
