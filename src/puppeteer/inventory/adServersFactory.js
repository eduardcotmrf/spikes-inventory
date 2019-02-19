const DoubleClickTranslator = require('./adServerTranslators/DoubleClickTranslator');

const BUILDERS = {};

BUILDERS[`${DoubleClickTranslator.getName()}`] = new DoubleClickTranslator();


module.exports = function buildAdServer (adServers, adType, url, position) {
	const builder = BUILDERS[adType.getType()];

	let adServer = {};

	if (builder) {
		adServer = builder.build(url, position);
		adServer.type = adType.getType();
	}

	return adServer;
};
