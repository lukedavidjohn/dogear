export const mapper = (tree, folderTitle) => {
  return tree.reduce((acc, branch) => {
    const { children, title, url } = branch;
    let parent = null;
    if (folderTitle) {
      parent = folderTitle;
    }

    if (!children) {
      acc.push({
        parent,
        type: "bookmark",
        title,
        url,
      });
    } else {
      // acc.push(...mapAllBookmarks(children, title));
      acc.push({
        parent,
        type: "folder",
        title,
        children: mapper(children, title),
      });
    }
    return acc;
  }, []);
};
