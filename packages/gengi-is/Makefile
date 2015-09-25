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
	npm install

test:
	exit 0

build: gulpbuild requirejs

gulpbuild:
	gulp build --env=production

requirejs:
	@./node_modules/.bin/r.js -o build-require.js

deploy:
	rsync --delete -ruP ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
