chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request.type === "getBookmarks") {
    console.log(request.bookmarks);
  }
});
