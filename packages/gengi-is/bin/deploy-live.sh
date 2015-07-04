#!/bin/bash

gulp build --prod
gulp manifest --prod
rsync -azv -O --chmod g+w dist/* vps01.kolibri.is:/www/gengi-is/live
gulp notify --title 'Deployment' --msg 'Successfully deployed to live'
