#!/bin/bash

gulp clean --prod
gulp build --prod
gulp run -almond
gulp manifest --prod
