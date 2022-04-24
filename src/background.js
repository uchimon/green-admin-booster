

const default_keyword = 'ログ';
const default_color = '#D25271';


chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ color: default_color });
	chrome.storage.sync.set({ keyword: default_keyword });
	console.log("==================");
});

// background message listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	return true;
});