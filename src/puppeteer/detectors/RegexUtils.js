

/**
 * Regular expression that options on a RegExp filter should match
 * @type {RegExp}
 */
const optionsRegExp = /\$(~?[\w-]+(?:=[^,]*)?(?:,~?[\w-]+(?:=[^,]*)?)*)$/;

/**
 * Converts filter text into regular expression string
 * @param {string} text as in Filter()
 * @param {boolean} [captureAll=false] whether to enable the capturing of
 *   leading and trailing wildcards in the filter text; by default, leading and
 *   trailing wildcards are stripped out
 * @return {string} regular expression representation of filter text
 */
function filterToRegExp(text, captureAll = false) {
	// remove multiple wildcards
	text = text.replace(/\*+/g, "*");

	if (!captureAll)
	{
		// remove leading wildcard
		if (text[0] === "*")
			text = text.substring(1);

		// remove trailing wildcard
		if (text[text.length - 1] === "*")
			text = text.substring(0, text.length - 1);
	}

	return text
	// remove anchors following separator placeholder
		.replace(/\^\|$/, "^")
		// escape special symbols
		.replace(/\W/g, "\\$&")
		// replace wildcards by .*
		.replace(/\\\*/g, ".*")
		// process separator placeholders (all ANSI characters but alphanumeric
		// characters and _%.-)
		.replace(/\\\^/g, "(?:[\\x00-\\x24\\x26-\\x2C\\x2F\\x3A-\\x40\\x5B-\\x5E\\x60\\x7B-\\x7F]|$)")
		// process extended anchor at expression start
		.replace(/^\\\|\\\|/, "^[\\w\\-]+:\\/+(?!\\/)(?:[^\\/]+\\.)?")
		// process anchor at expression start
		.replace(/^\\\|/, "^")
		// process anchor at expression end
		.replace(/\\\|$/, "$");
}

const normalizeContent = (content) => {
	return content[0] === "@" && content[1] === "@"? content.substr(2) : content;
};

function buildRegex (content) {
	if (content[0] === '!' || content.includes("#")) {
		return null;
	}

	let text = normalizeContent(content);

	let match = text.includes('$') ? optionsRegExp.exec(text) : null;
	if (match) {
		text = match.input.substr(0, match.index);
	}

	return new RegExp(filterToRegExp(text));
}

const isLiteralPattern = (pattern) => {
	return !/[*^|]/.test(pattern.replace(/^\|{2}/, "").replace(/\^$/, ""));
};


module.exports = {
	buildRegex,
	isLiteralPattern
};
