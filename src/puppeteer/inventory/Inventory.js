
const deepEqual = require('deep-equal');
const buildPlacement = require('./placementsFactory.js');
const buildAdServer = require('./adServersFactory');

class Inventory {
	constructor() {
		this.urls = [];
		this.placements = {};
		this.adServers = {};
		this.position = 0;
	}

	addAdRequest(adType, url, level) {
		const position = ++this.position;


		this.urls.push({
			position,
			url
		});

		const newAdServer = buildAdServer(this.adServers, adType, url, this.position);
		const duplicatedAdServerKey = getDuplicatedAdServerKey(this.adServers, newAdServer);

		let adServerName;
		if (duplicatedAdServerKey) {
			adServerName = this.adServers[duplicatedAdServerKey];
		} else {
			adServerName = getAdServerName(this.adServers, adType.getName());
			this.adServers[adServerName] = newAdServer;
		}

		this.placements[getPlacementName(level, position)] = buildPlacement(adServerName, position, url);
	}

	getInventory() {
		return {
			placements: this.placements,
			adServers: this.adServers
		};
	}
	getUrls() {
		return this.urls;
	}
}


function numTimesOfAdType(adTypes, adTypeName) {
	return adTypes.reduce((n, x) => n + (x === adTypeName), 0);
}
function getAdServerName(adServers, adTypeName) {
	const numTimesOfType = numTimesOfAdType(Object.keys(adServers), adTypeName);

	const pos = numTimesOfType > 0 ? `_${numTimesOfType}` : '';

	return `${adTypeName}${pos}`;
}

function getDuplicatedAdServerKey(adServers, newAdServer) {
	const keys = Object.keys(adServers);

	for(let i = 0; i < keys; i++) {
		const currentAdServer = adServers[keys[i]];

		if (deepEqual(currentAdServer, newAdServer)) {
			return keys[i];
		}
	}
}

function getPlacementName(level, position) {
	const levelName = level === 1? 'inline_' : 'mosaic_';

	return `${levelName}_${position}`;
}


module.exports = Inventory;
