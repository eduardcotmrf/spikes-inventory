const DoubleClickTranslator = require('./adServerTranslators/DoubleClickTranslator');
const TaboolaTranslator = require('./adServerTranslators/TaboolaTranslator');

const BUILDERS = {};

BUILDERS[`${DoubleClickTranslator.getName()}`] = new DoubleClickTranslator();
BUILDERS[`${TaboolaTranslator.getName()}`] = new TaboolaTranslator();


module.exports = async function buildAdServer (adServers, adType, url, position, page) {
	const builder = BUILDERS[adType.getType()];

	let adServer = {};

	if (builder) {
		adServer = await builder.build(url, position, page);
		adServer.type = adType.getType();
	}

	return adServer;
};
