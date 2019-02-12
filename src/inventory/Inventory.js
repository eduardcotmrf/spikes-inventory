

const buildPlacement = require('./placementsFactory.js');
const buildAdServer = require('./adServersFactory');


const getAdServerName = (adServers, adTypeName, position) => {
	const pos = Object.keys(adServers).includes(adTypeName) ? `_${position}` : '';

	return `${adTypeName}${pos}`;
};


class Inventory {
	constructor() {
		this.placements = {};
		this.adServers = {};
	}

	addAdRequest(adType, url, position) {
		const adServerName = getAdServerName(this.adServers, adType.getName(), position);

		this.adServers[`${adServerName}`] = buildAdServer(adType, url, position);
		this.placements[`inline_${position}`] = buildPlacement(adServerName, position, url);
	}

	getInventory() {
		return {
			placements: this.placements,
			adServers: this.adServers
		};
	}
}


module.exports = Inventory;
