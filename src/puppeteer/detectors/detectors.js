const Detector = require('./Detector');

const detectors = [];

detectors.push(new Detector('doubleclick', 'dfp', [
	'doubleclick.net/gampad/ads',
	// '/custom/doubleclick/*',
	// '/doubleclick.aspx',
	// '/doubleclick.js',
	// '/doubleclick.min',
	// '/doubleclick.php',
	// '/doubleclick.swf',
	// '/doubleclick/iframe.',
	// '/doubleclick_ads.',
	// '/doubleclick_ads/*',
	// '/doubleclickad.',
	// '/doubleclickads.',
	// '/doubleclickads/*',
	// '/doubleclickads?',
	// '/doubleclickbannerad?',
	// '/doubleclickcontainer.',
	// '/doubleclickinstreamad.',
	// '/doubleclickloader.',
	// '/doubleclickplugin.',
	// '/doubleclicktag.',
	// '_doubleclick.',
	// '_doubleclick_ad.'
]));

// detectors.push(new Detector('smartadserver', 'smart', [
// 	'smartclip.net/ads',
// 	'/smart-ad-server.',
// 	'/smart_ad/*',
// 	'/smartad-',
// 	'/smartad.$domain=~smartad.ai',
// 	'/smartad/*',
// 	'/smartAd?',
// 	'/smartad_',
// 	'/smartads.$domain=~smartads.cz|~smartads.io',
// 	'/smartadserver.$domain=~smartadserver.com|~smartadserver.com.br|~smartadserver.de|~smartadserver.es|~smartadserver.fr|~smartadserver.it|~smartadserver.pl|~smartadserver.ru',
// 	'/smartlinks.epl?'
// ]));
//
// detectors.push(new Detector('taboola', 'taboola', [
// 	'/ads/taboola/*',
//
// ]));


function detectAdServer(url) {
	return detectors.find( detector => {
		return detector.detect(url);
	});
}

module.exports = detectAdServer;
