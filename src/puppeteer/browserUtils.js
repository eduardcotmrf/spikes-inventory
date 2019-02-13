// From: https://github.com/chenxiaochun/blog/issues/38
async function autoScroll(page){
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			let totalHeight = 0;
			let distance = 100;
			let timer = setInterval(() => {
				let scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if(totalHeight >= scrollHeight){
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}


module.exports = {
	autoScroll
};
