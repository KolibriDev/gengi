import domReady from '../vendor/domReady';

export default function(callback, reLoadCallback) {
	domReady(callback);
	reLoadCallback = typeof reLoadCallback === 'function' ? reLoadCallback : callback;
	$(document).on('re-loading', reLoadCallback);
}
