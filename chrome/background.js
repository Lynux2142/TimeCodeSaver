chrome.tabs.onUpdated.addListener((tabsId, changeInfo, tab) => {
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		const url = new URL(tabs[0].url);
		chrome.tabs.sendMessage(tabs[0].id, url.host, () => {chrome.runtime.lastError});
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.type) {
		case 'get-url':
			chrome.tabs.query({active: true, currentWindow: true}, tabs => {
				sendResponse(tabs[0].url);
			});
			break;
		case 'update-url':
			chrome.tabs.update(sender.tab.id, {url: request.url});
			break;
		default:
			console.log('data not recognized');
	}
	return (true);
});
