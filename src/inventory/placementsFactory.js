const buildPlacement = (adServerName, position, url) => {
	return {
		adServer: adServerName,
		params: {
			url: url,
			position: position
		}
	}
};

module.exports = buildPlacement;
