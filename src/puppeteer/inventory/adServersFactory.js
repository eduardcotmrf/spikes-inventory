const DoubleClickTranslator = require('./adServerTranslators/DoubleClickTranslator');
const TaboolaTranslator = require('./adServerTranslators/TaboolaTranslator');
const SmartAdServerTranslator = require('./adServerTranslators/SmartAdServerTranslator');
const TeadsAdServerTranslator = require('./adServerTranslators/TeadsAdServerTranslator');

const BUILDERS = {};

BUILDERS[`${DoubleClickTranslator.getName()}`] = new DoubleClickTranslator();
BUILDERS[`${TaboolaTranslator.getName()}`] = new TaboolaTranslator();
BUILDERS[`${SmartAdServerTranslator.getName()}`] = new SmartAdServerTranslator();
BUILDERS[`${TeadsAdServerTranslator.getName()}`] = new TeadsAdServerTranslator();


module.exports = async function buildAdServer (adServers, adType, url, position, page) {
	const builder = BUILDERS[adType.getType()];

	let adServer = {};

	if (builder) {
		adServer = await builder.build(url, position, page);
		adServer.type = adType.getType();
	}

	return adServer;
};
