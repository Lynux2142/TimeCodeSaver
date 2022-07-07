browser.tabs.onUpdated.addListener((tabsId, changeInfo, tab) => {
	browser.tabs.query({active: true, currentWindow: true}, tabs => {
		browser.tabs.sendMessage(tabs[0].id, "bonjour");
	});
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.type) {
		case 'get-url':
			browser.tabs.query({active: true, currentWindow: true}, tabs => {
				sendResponse(tabs[0].url);
			});
			break;
		case 'update-url':
			browser.tabs.update(sender.tab.id, {url: request.url});
			break;
		default:
			console.log('data not recognized');
	}
	return (true);
});
