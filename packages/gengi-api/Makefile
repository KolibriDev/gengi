ifndef WEB_USER
	WEB_USER := www-data
endif

ifndef TARGET_HOST
	TARGET_HOST := localhost
endif

ifndef TARGET_DIR
	TARGET_DIR := /var/www/gengi/api
endif

all: build deploy

npm:
	npm install

test:
	jshint .
	@./node_modules/.bin/mocha

.PHONY: test

build:
	gulp build

deploy:
	rsync --delete-after --quiet -rlptuPO --chmod=g+w ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
	ssh ${WEB_USER}@${TARGET_HOST} 'cd /var/www/gengi/api && npm install --production && pm2 startOrRestart gengi-api.json'
