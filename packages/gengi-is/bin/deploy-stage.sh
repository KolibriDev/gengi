#!/bin/bash

gulp run -build
rsync -azv -O --chmod g+w dist/* vps01.kolibri.is:/www/gengi-is/stage
gulp notify --title 'Deployment' --msg 'Successfully deployed to staging'
