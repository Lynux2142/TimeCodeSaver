button = document.createElement("a");

button.innerHTML = "<svg height=\"100%\" width=\"100%\" viewBox=\"-6 -6 36 36\"><g><path fill=\"none\" d=\"M0 0h24v24H0z\"/><path class=\"ytp-svg-fill\" d=\"M4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 1v5h9V4H7zm-1 8v7h12v-7H6zm7-7h2v3h-2V5z\"/></g></svg>"
button.classList = "ytp-play-button ytp-button";
button.addEventListener("click", () => {
	time = document.querySelector(".ytp-time-current").innerHTML;
	time = time.split(':').reverse();
	duration = 0;
	mul = [1, 60, 3600];
	time.forEach((items, index) => {
		duration += items * mul[index];
	});
	browser.runtime.sendMessage({type: 'get-url'}, response => {
		const url = new URL(response);
		let params = new URLSearchParams(url.search);
		params.set('t', `${duration}s`);
		const new_url = new URL(`${url.origin}${url.pathname}?${params.toString()}`);
		browser.runtime.sendMessage({type: 'update-url', url: new_url.href}, () => {browser.runtime.lastError});
	});
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	document.querySelector('div.ytp-left-controls').appendChild(button);
});
