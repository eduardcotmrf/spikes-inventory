const URL = require('url').URL;

const getParameters = (url) => {
	const uri = new URL(url);

	return uri.searchParams;
};

const addSlotName = (doubleClick, params) => {
	doubleClick.slot = '__TO_BE_DEFINED__'
	if (params.has('slotname')) {
		doubleClick.slot = params.get('slotname');
	} else if (params.has('iu')) {
		doubleClick.slot = params.get('iu');
	} else if (params.has('iu_parts')) {
		doubleClick.slot = params.get('iu_parts');
	}
};

const addSize = (doubleClick, sz) => {
	const dimensions = sz.split('x');
	doubleClick.width = '${WIDTH}';
	doubleClick.height = '${HEIGHT}';

	if (dimensions.length >= 2) {
		doubleClick.width = dimensions[0];
		doubleClick.height= dimensions[1];
	}
};

const addSizeOrMultiSize = (doubleClick, params) => {
	if (params.has('sz')) {
		const sz = params.get('sz');

		if (sz.includes('|')) {
			doubleClick['multi-size'] = sz.split('|').join(',');
		} else if (sz.includes(',')) {
			doubleClick['multi-size'] = sz;
		} else if (sz.includes('x')) {
			addSize(doubleClick, sz);
		}
	}
};

const addTargeting = (doubleClick, params) => {
	doubleClick.json = {
		targeting: {
			pos: "${TARGETING}"
		}
	};
};

const build = (url) => {
	const doubleClick = {};
	const params = getParameters(url);

	if (params) {
		addSlotName(doubleClick, params);
		addSizeOrMultiSize(doubleClick, params);
		addTargeting(doubleClick, params);
	}

	return doubleClick;
};


module.exports = {
	build
};
