#!/bin/bash

gulp clean --prod
gulp build --prod
# TODO: Make this work with babel
# gulp run -require
gulp manifest --prod
rsync -azv -O --chmod g+w dist/* vps01.kolibri.is:/www/gengi-is/stage
gulp notify --title 'Deployment' --msg 'Successfully deployed to staging'
