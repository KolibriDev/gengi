ifndef WEB_USER
	WEB_USER := www-data
endif

ifndef TARGET_HOST
	TARGET_HOST := localhost
endif

ifndef TARGET_DIR
	TARGET_DIR := /var/www/gengi.is
endif

all: npm test build deploy

npm:
	npm install --loglevel=error

test: jshint jasmine

jasmine:
	@./node_modules/.bin/jasmine

jshint:
	@./node_modules/.bin/jshint ./gulpfile.js --verbose --reporter node_modules/jshint-stylish
	@./node_modules/.bin/jshint ./tasks       --verbose --reporter node_modules/jshint-stylish
	@./node_modules/.bin/jshint ./src/js      --verbose --reporter node_modules/jshint-stylish
	@./node_modules/.bin/jshint ./spec        --verbose --reporter node_modules/jshint-stylish

build: gulpbuild requirejs

gulpbuild:
	gulp build --env=production
	gulp manifest --env=production

requirejs:
	@./node_modules/.bin/r.js -o build-require.js

deploy:
	rsync --delete -ruP ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
