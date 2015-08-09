
npm:
	npm install
	npm install jshint -g

test:
	npm test

build:
	gulp clean --prod
	gulp build --prod
	r.js -o build-require.js
	gulp manifest --prod
