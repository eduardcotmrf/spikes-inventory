
const AbstractTranslator = require('./AbstractTranslator');

async function getTaboola(page) {
	return await page.evaluate(() => {
		const scripts = document.querySelectorAll('script');
		const taboola = {};

		for(let i = 0; i < scripts.length; i++) {
			if(textContent.includes('window._taboola = window._taboola || [];') && textContent.includes('mode')) {
				var newText = textContent
					.replace('window._taboola = window._taboola || [];', '')
						.trim()
							.replace('_taboola.push({', '')
								.replace('});', '')
									.trim();

				var split = newText.split(',');
				split.forEach(value => {
					var inside = value.trim().split(':');
					taboola[inside[0]] = inside[1];
				});
			}
		}
		return taboola;
	});
}



class TaboolaTranslator extends AbstractTranslator {
	constructor() {
		super();
	}
	static getName() {
		return 'taboola';
	}

	async decorate(adServer, url, params, page) {
		const taboola = await getTaboola();
		adServer.article = 'auto';
		adServer.publisher = getHostName(url);

		if (taboola) {
			Object.assign(adServer, taboola);
		}

		return adServer;
	}

}

module.exports = TaboolaTranslator;
