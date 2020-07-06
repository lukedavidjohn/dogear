/*global chrome*/
import { mapper } from "./mapper";

export const getBookmarks = (callback) => {
  chrome.bookmarks.getTree(([tree]) => {
    const { children: folders } = tree;
    const bookmarksBar = folders[0].children;
    const otherBookmarks = folders[1].children;

    const displayTree = mapper(bookmarksBar);
    const otherBookmarksObject = {
      parent: null,
      type: "folder",
      title: "Other Bookmarks",
      children: mapper(otherBookmarks),
    };
    displayTree.push(otherBookmarksObject);

    callback(displayTree);
  });
};
