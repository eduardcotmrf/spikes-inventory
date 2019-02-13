/*
* Easylist: https://easylist.to/easylist/easylist.txt
*
* It's a merge of every single block found in their repo: https://github.com/easylist/easylist
*
* */
const fs = require('fs');
const path = require('path');

const isValidRule = (content) => {
	return content.length > 2 && !content.startsWith('! ');
};


// TODO: For this initial step we are just going to work with: easylist general block
// https://raw.githubusercontent.com/easylist/easylist/master/easylist/easylist_general_block.txt
function getData() {
	return fs.readFileSync(path.resolve(__dirname, 'easylist.txt'),{ encoding: 'utf8' })
}

function getAllEasylistData() {
	const contentRows = getData().split('\n');

	return contentRows.filter(value => isValidRule(value));
}


module.exports = getAllEasylistData();



