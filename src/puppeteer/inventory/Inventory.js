
const deepEqual = require('deep-equal');
const buildPlacement = require('./placementsFactory.js');
const buildAdServer = require('./adServersFactory');

class Inventory {
	constructor() {
		this.urls = [];
		this.placements = {};
		this.adServers = {};
		this.mosaicPosition = 0;
		this.inlinePosition = 0;
	}

	addAdRequest(adType, url, level) {
		let position;

		if (isInline(level)) {
			position = ++this.inlinePosition;
		} else {
			position = ++this.mosaicPosition;
		}

		this.urls.push({
			position,
			url,
			level
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

function isInline(level) {
	return level === 1;
}

function getPlacementName(level, initialPos) {
	const levelName = isInline(level)? 'inline' : 'mosaic';
	const position = initialPos > 1? `_${initialPos}`: '';

	return `${levelName}${position}`;
}


module.exports = Inventory;
