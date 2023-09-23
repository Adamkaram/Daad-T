chrome.commands.onCommand.addListener(function (command) {
  if (command === "extractSelectedText") {
    // Send a message to the content script to trigger the extraction
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        // Handle the selected text here (e.g., log it or use it in your extension)
        console.log("Selected Text:", response);
      });
    });
  }
});
