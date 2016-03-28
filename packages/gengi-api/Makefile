ifndef WEB_USER
	WEB_USER := www-data
endif

ifndef TARGET_HOST
	TARGET_HOST := localhost
endif

ifndef TARGET_DIR
	TARGET_DIR := /var/www/gengi/api
endif

all: npm test build deploy

npm:
	npm install --loglevel=error

.PHONY: test, test-build
test: lint build jasmine
test-dev:
	./node_modules/.bin/supervisor -w spec,dist -n exit -x make jasmine

dev:
	./node_modules/.bin/supervisor -w dist -n exit -x node dist/server.js

jasmine:
	./node_modules/.bin/jasmine

lint:
	./node_modules/.bin/eslint ./gulpfile.js
	./node_modules/.bin/eslint ./tasks
	./node_modules/.bin/eslint ./src
	./node_modules/.bin/eslint ./spec

build:
	gulp build

deploy:
	rsync --delete-after --quiet -rlptuPO --chmod=g+w ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
	ssh ${WEB_USER}@${TARGET_HOST} 'cd /var/www/gengi/api/v2 && npm install --production && pm2 startOrRestart gengi-api.json'
