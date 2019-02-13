const URL = require('url').URL;

const BLACK_LIST_EXTENSIONS = [
	'.css',
	'.png',
	'.jpg',
	'.jpeg',
	'.woff2',
	'.woff',
	'.ttf',
	'gardac-sync.js',
];


module.exports = function isBlackListed(url) {
	const uri = new URL(url);

	return BLACK_LIST_EXTENSIONS.some((urlEnd) => {
		return uri.pathname ? uri.pathname.endsWith(urlEnd) :
			url.endsWith(urlEnd);
	});
};
