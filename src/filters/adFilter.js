const EASY_LIST_FILTER = require('./getEasyList');

const AD_FILTER = [
	'doubleclick.net/gampad/ads'
];


function isAnAdRequest(url) {
	const ALL_FILTERS = [...AD_FILTER, ...EASY_LIST_FILTER];

	return ALL_FILTERS.some((urlPart) => url.includes(urlPart));
}

module.exports = isAnAdRequest;
