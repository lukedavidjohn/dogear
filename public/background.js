chrome.runtime.onInstalled.addListener(() => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    chrome.browserAction.setIcon({
      path: "./dogear-white-128.png",
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  console.log(request);
});
