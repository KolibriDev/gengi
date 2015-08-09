
npm:
	npm install

test:
	exit 0

build:
	gulp clean --prod
	gulp build --prod
	r.js -o build-require.js
	gulp manifest --prod
