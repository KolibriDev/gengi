ifndef WEB_USER
	WEB_USER := www-data
endif

ifndef TARGET_HOST
	TARGET_HOST := localhost
endif

ifndef TARGET_DIR
	TARGET_DIR := /var/www/gengi.is
endif

npm:
	npm install

test:
	exit 0

stage:
	gulp clean --env stage
	gulp build --env stage
	gulp manifest --env stage

build:
	gulp clean --env production
	gulp build --env production
	gulp manifest --env production

deploy:
	rsync --delete -ruP ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
