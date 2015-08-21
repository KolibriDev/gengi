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
 	mkdir -p ${TARGET_DIR}
	cp -rf ./dist/* ${TARGET_DIR}
