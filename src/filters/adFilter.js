// const EASY_LIST_FILTER = require('./getEasyList');

// TODO Create the filters from easylist

const Filter = require('./Filter');

const AD_TYPES = [
	new Filter('doubleclick', 'dfp', ['doubleclick.net/gampad/ads']),
	// new Filter('smartadserver', 'smart', ['smartclip.net/ads']),
	// new Filter('custom', 'custom', ['']) // TODO for the moment the rest will be consider custom
];


function findAdType(url) {
	// const ALL_FILTERS = [...AD_FILTER, ...EASY_LIST_FILTER];

	return [...AD_TYPES].find( adType => {
		// console.log('validating: ', url);
		return adType.validates(url)
	});
}

module.exports = findAdType;
