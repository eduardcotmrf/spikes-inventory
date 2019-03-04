const URL = require('url').URL;
const AbstractTranslator = require('./AbstractTranslator');


class SmartAdServerTranslator extends AbstractTranslator {
	constructor() {
		super();
	}
	static getName() {
		return 'smartadserver';
	}

	async decorate(adServer, url, params, page) {
		const uri = new URL(url);

		if (params.has('siteid')) {
			adServer.site = params.get('siteid');
		}
		if (params.has('pgid')) {
			adServer.page = params.get('pgid');
		}
		if (params.has('fmtid')) {
			adServer.format = params.get('fmtid');
		}
		adServer.domain = uri.origin;

		return adServer;

	}

}

module.exports = SmartAdServerTranslator
