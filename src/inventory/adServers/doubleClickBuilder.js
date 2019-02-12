const URL = require('url').URL;

const getParameters = (url) => {
	const uri = new URL(url);

	return uri.searchParams;
};

const build = (url) => {
	const doubleClick = {};
	const params = getParameters(url);

	if (params) {

		// for (const [name, value] of params) {
		// 	doubleClick[name] = value;
		// }

		if (params.has('slotname')) {
			doubleClick['slot'] = params.get('slotname');
		}

		if (params.has('sz')) {
			doubleClick['multi-size'] = (params.get('sz').split('|')).join(',');
		}

		if (params.has('correlator')) {
			doubleClick['correlator'] = params.get('correlator');
		}
	}



	return doubleClick;
};


module.exports = {
	build
};
