chrome.runtime.onInstalled.addListener(() => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    chrome.browserAction.setIcon({
      path: "./dogear-white-128.png",
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request.type === "getBookmarks") {
    // console.log(request.message);
  }
  if (request.type === "filterOnChange") {
  }
  if (request.type === "onKeyDown") {
    // console.log(request.key);
  }
});
