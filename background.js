// Create the context menu item
var contextMenuItem = {
    "id": "IMDbsearchContext",
    "title": "Convert Between Languages",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

// Add a listener for context menu item clicks
chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "IMDbsearchContext" && clickData.selectionText) {
        // Send a message to the content script with the selected text
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { text: clickData.selectionText }, function (response) {
               console.log(response)
            });
        });
    }
});
