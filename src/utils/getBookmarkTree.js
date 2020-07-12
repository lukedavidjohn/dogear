/*global chrome*/
import { mapper } from "./mapper";
import _ from "lodash";

export const getBookmarkTree = (callback) => {
  chrome.bookmarks.getTree(([tree]) => {
    const { children } = tree;
    const bookmarksBar = children[0].children;
    const otherBookmarks = children[1].children;

    const bookmarkTree = mapper(bookmarksBar);
    bookmarkTree.push({
      parent: null,
      type: "folder",
      title: "Other Bookmarks",
      children: mapper(otherBookmarks),
    });
    const bookmarks = _.orderBy(
      bookmarkTree.filter((branch) => {
        return branch.type === "bookmark";
      }),
      ["title"],
      ["asc"]
    );
    const folders = _.orderBy(
      bookmarkTree.filter((branch) => {
        return branch.type === "folder";
      }),
      ["title"],
      ["asc"]
    );
    const orderedBookmarkTree = folders.concat(bookmarks);
    callback(orderedBookmarkTree);
  });
};
