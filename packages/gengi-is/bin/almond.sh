#!/bin/bash

r.js -o build-almond.js
cat dist/js/main.js | pbcopy
gulp notify --title 'RequireJS optimizer (w/almond)' --msg 'Copied output to clipboard'
