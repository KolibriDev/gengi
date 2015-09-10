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
	npm install -g gulp jshint jasmine-node
	npm install --loglevel=error

.PHONY: test, test-build
test: test-build test-project

test-build: build
	jshint ./gulpfile.js --verbose --reporter node_modules/jshint-stylish
	jshint ./tasks --verbose --reporter node_modules/jshint-stylish
	jshint ./test-build --verbose --config ./.jshintrc-test --reporter node_modules/jshint-stylish
	jasmine-node --test-dir test-build --verbose --color

test-project:
	jshint ./src --verbose --reporter node_modules/jshint-stylish
	jshint ./test --verbose --config ./.jshintrc-test --reporter node_modules/jshint-stylish
	@./node_modules/.bin/mocha

build:
	gulp build

deploy:
	rsync --delete-after --quiet -rlptuPO --chmod=g+w ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
	ssh ${WEB_USER}@${TARGET_HOST} 'cd /var/www/gengi/api && npm install --production && pm2 startOrRestart gengi-api.json'
