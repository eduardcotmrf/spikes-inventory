const URL = require('url').URL;
const AbstractTranslator = require('./AbstractTranslator');


class TeadsServerTranslator extends AbstractTranslator {
	constructor() {
		super();
	}
	static getName() {
		return 'teads';
	}

	async decorate(adServer, url, params, page) {
		const uri = new URL(url);

		const pathName = uri.pathname;
		if (pathName.endsWith('/ad')) {
			const values = pathName.split('/');
			adServer.pid = values[values.length - 2];
		}

		return adServer;

	}

}

module.exports = TeadsServerTranslator;
