let buttonYT = document.createElement("a");

buttonYT.innerHTML = "<svg height=\"90%\" width=\"90%\" viewBox=\"-8 -8 36 36\"><g><path fill=\"none\" d=\"M0 0h24v24H0z\"/><path class=\"ytp-svg-fill\" d=\"M4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 1v5h9V4H7zm-1 8v7h12v-7H6zm7-7h2v3h-2V5z\"/></g></svg>"
buttonYT.classList = "ytp-play-button ytp-button";
buttonYT.addEventListener("click", () => {
	let time = document.querySelector(".ytp-time-current").innerHTML;
	time = time.split(':').reverse();
	let duration = 0;
	let mul = [1, 60, 3600];
	time.forEach((items, index) => {
		duration += items * mul[index];
	});
	chrome.runtime.sendMessage({type: 'get-url'}, response => {
		const url = new URL(response);
		let params = new URLSearchParams(url.search);
		params.set('t', `${duration}s`);
		const new_url = new URL(`${url.origin}${url.pathname}?${params.toString()}`);
		chrome.runtime.sendMessage({type: 'update-url', url: new_url.href}, () => {chrome.runtime.lastError});
	});
});

let buttonTTV = document.createElement("button");
buttonTTV.classList = "ScCoreButton-sc-1qn4ixc-0 ScCoreButtonSecondary-sc-1qn4ixc-2 ffyxRu kgzEiA";
buttonTTV.style.cssText = "margin:10px;padding:10px";
buttonTTV.innerHTML = "Save";
buttonTTV.addEventListener("click", () => {
	let time = document.querySelector('[data-a-target="player-seekbar-current-time"]').innerHTML;
	time = time.split(':');
	chrome.runtime.sendMessage({type: 'get-url'}, response => {
		const url = new URL(response);
		let params = new URLSearchParams(url.search);
		params.set('t', `${time[0]}h${time[1]}m${time[2]}s`);
		const new_url = new URL(`${url.origin}${url.pathname}?${params.toString()}`);
		chrome.runtime.sendMessage({type: 'update-url', url: new_url.href}, () => {chrome.runtime.lastError});
	});
});

const host = {
	'www.youtube.com': {
		name: 'div.ytp-right-controls',
		button: buttonYT
	},
	'www.twitch.tv': {
		name: '.Layout-sc-nxg1ff-0.djAXJb',
		button: buttonTTV
	}
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	document.querySelector(host[request].name).prepend(host[request].button);
});
