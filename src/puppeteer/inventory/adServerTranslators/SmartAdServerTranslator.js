const AbstractTranslator = require('./AbstractTranslator');



class SmartAdServerTranslator extends AbstractTranslator {
	constructor() {
		super();
	}
	static getName() {
		return 'smartadserver';
	}

	decorate(adServer, url, params, page) {

	}

}

module.exports = SmartAdServerTranslator
