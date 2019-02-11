const fs = require('fs');
const path = require('path');

const AD_TYPES = [
	{
		type: 'doubleclick',
		name: 'dfp',
		condition: (url) => url.includes('doubleclick.net/gampad/ads')
	}, {
		type: 'smartadserver',
		name: 'smart',
		condition: (url) => url.includes('smartclip.net/ads')
	}, {
		type: 'criteo',
		name: 'criteo',
		condition: (url) => url.includes('criteo.net')
	}, {
		type: 'custom',
		name: 'custom',
		condition: (url) => url.includes('')
	}];

function findAdTypes(url) {
	for(let i = 0; i < AD_TYPES.length; i++) {
		if (AD_TYPES[i].condition(url)) {
			return AD_TYPES[i];
		}
	}
}

let adRequests = [];

function addAdRequest(url, position) {
	adRequests.push({
		url: url,
		position: position
	});
}

function buildInventory() {
	const inventory = {
		placements: {},
		adServers: {}
	};

	debugger;

	for (let i = 0; i < adRequests.length; i++) {
		const adRequest = adRequests[i];
		const pos = adRequest.position;

		const adType = findAdTypes(adRequest.url);

		if (adType) {
			const adServerName = `${adType.name}_${pos}`;

			inventory.placements[`inline_${pos}`] = {
				adServer: adServerName,
				params: {
					url: adRequest.url
				}
			};

			inventory.adServers[adServerName] = {
				type: adType.type,
				url: adRequest.url
			}
		}
	}

	return inventory;
}

function createInventory() {
	fs.writeFile(path.resolve(__dirname, './result/adRequest.json'), JSON.stringify(adRequests), (err) => {
		if (err) throw err;
		console.log('Ad Requests saved!');
	});

	fs.writeFile(path.resolve(__dirname, './result/inventory.json'), JSON.stringify(buildInventory()), (err) => {
		if (err) throw err;
		console.log('Inventory saved!');
	});
}

module.exports = {
	addAdRequest,
	createInventory,
};
