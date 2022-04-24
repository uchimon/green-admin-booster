// background message listener
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	return true;
});