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

build:
	gulp clean --prod
	gulp build --prod
	gulp manifest --prod

deploy:
	rsync --delete -ruP ./dist/* ${WEB_USER}@${TARGET_HOST}:${TARGET_DIR}
