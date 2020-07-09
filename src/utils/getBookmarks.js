/*global chrome*/
import { mapper } from "./mapper";

export const getBookmarks = (callback) => {
  chrome.bookmarks.getTree(([tree]) => {
    const { children: folders } = tree;
    const bookmarksBar = folders[0].children;
    const otherBookmarks = folders[1].children;

    const displayTree = mapper(bookmarksBar);
    displayTree["Other Bookmarks"] = {
      parent: null,
      type: "folder",
      title: "Other Bookmarks",
      children: mapper(otherBookmarks),
    };
    callback(displayTree);
  });
};
