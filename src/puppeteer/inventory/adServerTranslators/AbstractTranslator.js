const URL = require('url').URL;

class AbstractTranslator {
	constructor(){

	}

	getParameters(url) {
		const uri = new URL(url);

		return uri.searchParams;
	}

	build(url) {
		const adServer = {};
		const params = this.getParameters(url);

		if (params) {
			this.decorate(adServer, url, params);
		}
		return adServer;
	}
}

module.exports = AbstractTranslator;
