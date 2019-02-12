const doubleClickBuilder = require('./adServers/doubleClickBuilder');

const BUILDERS = {
	'doubleclick': doubleClickBuilder
};

const buildAdServer = (adType, url, position) => {
	const builder = BUILDERS[adType.getType()];

	let adServer = {};

	if (builder) {
		adServer = builder.build(url, position);
		adServer.type = adType.getType();
	}

	return adServer;
};

module.exports = buildAdServer;
