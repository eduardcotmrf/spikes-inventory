const { buildRegex, isLiteralPattern } = require('./RegexUtils');

class Detector {
	constructor(type, name, stringsToMatch) {
		this.type = type;
		this.name = name;
		this.patternsToContains = [];
		this.patternsToMatch = [];

		this.parse(stringsToMatch);
	}

	getType() {
		return this.type;
	}
	getName() {
		return this.name;
	}

	parse(stringsToMatch) {
		for (let content of stringsToMatch) {
			if (isLiteralPattern(content)) {
				this.patternsToContains.push(content)
			} else {
				const regex = buildRegex(content);

				regex && this.patternsToMatch.push(regex);
			}
		}
	}

	// TODO this should be to add all the patterns from easylist
	addPattern(content) {
		this.parse([content]);
	}

	matches(content) {
		return this.patternsToMatch.some( regexToMatch => regexToMatch.test(content));
	}

	contains(content) {
		return this.patternsToContains.some(pattern => content.includes(pattern));
	}

	detect(content) {
		const matches = this.matches(content) || this.contains(content);

		if (matches) {
			return this;
		}
	}

}

module.exports = Detector;
