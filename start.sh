#!/bin/bash

if $PROD;
then gulp production;
else gulp staging;
fi
