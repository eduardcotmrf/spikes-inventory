class Filter {
	constructor(type, name, listOfStringToMatch) {
		this.type = type;
		this.name = name;
		this.listOfStringToMatch = listOfStringToMatch;
	}

	matches(content) {
		// TODO to implement
		return false;
	}

	contains(content) {
		return this.listOfStringToMatch.some(stringToMatch => content.includes(stringToMatch));
	}

	validates(content) {
		return this.matches(content) || this.contains(content);
	}
	getType() {
		return this.type;
	}
	getName() {
		return this.name;
	}
}

module.exports = Filter;
