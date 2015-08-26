ifndef WEB_USER
	WEB_USER := www-data
endif

ifndef TARGET_HOST
	TARGET_HOST := localhost
endif

ifndef TARGET_DIR
	TARGET_DIR := /var/www/gengi/api
endif

npm:
	npm install

test:
	jshint .
	@./node_modules/.bin/mocha

.PHONY: test

build:
	gulp clean
	gulp build

deploy:
	rsync --delete -ruP ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
	ssh ${WEB_USER}@${TARGET_HOST} 'pm2 gracefulReload all'
