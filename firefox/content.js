let buttonYT = document.createElement("button");

buttonYT.innerHTML = "<svg height=\"100%\" width=\"100%\" viewBox=\"-6 -6 36 36\"><path class=\"ytp-svg-fill\" d=\"M4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 1v5h9V4H7zm-1 8v7h12v-7H6zm7-7h2v3h-2V5z\"/></svg>"
buttonYT.classList = "ytp-button";
buttonYT.addEventListener("click", () => {
	let time = document.querySelector(".ytp-time-current").innerHTML;
	time = time.split(':').reverse();
	let duration = 0;
	let mul = [1, 60, 3600];
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

let buttonTTV = document.createElement("button");
buttonTTV.classList = "ScCoreButton-sc-ocjdkq-0 caieTg ScButtonIcon-sc-9yap0r-0 dOOPAe";
buttonTTV.innerHTML = "<svg class=\"ScIconSVG-sc-1q25cff-1 jpczqG\" height=\"100%\" width=\"100%\" viewBox=\"-6 -6 36 36\"><path d=\"M4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 1v5h9V4H7zm-1 8v7h12v-7H6zm7-7h2v3h-2V5z\"/></svg>";
buttonTTV.addEventListener("click", () => {
	let time = document.querySelector('[data-a-target="player-seekbar-current-time"]').innerHTML;
	time = time.split(':');
	browser.runtime.sendMessage({type: 'get-url'}, response => {
		const url = new URL(response);
		let params = new URLSearchParams(url.search);
		params.set('t', `${time[0]}h${time[1]}m${time[2]}s`);
		const new_url = new URL(`${url.origin}${url.pathname}?${params.toString()}`);
		browser.runtime.sendMessage({type: 'update-url', url: new_url.href}, () => {browser.runtime.lastError});
	});
});

const host = {
	'www.youtube.com': {
		name: 'div.ytp-right-controls',
		button: buttonYT
	},
	'www.twitch.tv': {
		name: 'div.player-controls__right-control-group',
		button: buttonTTV
	}
};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	document.querySelector(host[request].name).prepend(host[request].button);
});
