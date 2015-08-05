#!/bin/bash

git pull && \
rm -rf node_modules && \
npm install --production && \
forever restartall
