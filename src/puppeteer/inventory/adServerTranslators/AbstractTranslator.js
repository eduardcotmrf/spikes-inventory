const URL = require('url').URL;

class AbstractTranslator {
	constructor(){

	}

	getHostName(url) {
		const uri = new URL(url);
		return uri.hostname;
	}

	getParameters(url) {
		const uri = new URL(url);

		return uri.searchParams;
	}

	async build(url, position, page) {
		const adServer = {};
		const params = this.getParameters(url);

		if (params) {
			await this.decorate(adServer, url, params, page);
		}
		return adServer;
	}
}

module.exports = AbstractTranslator;
