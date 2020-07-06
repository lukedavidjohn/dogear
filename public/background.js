chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request.type === "getBookmarks") {
    console.log(request.displayTree);
  }
  if (request.type === "filterOnChange") {
    console.log(request.filteredBookmarks);
  }
});
