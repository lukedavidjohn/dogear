export const mapper = (tree, folderTitle) => {
  return tree.reduce((acc, branch) => {
    const { children, title, url } = branch;
    let parent = "main";
    if (folderTitle) {
      parent = folderTitle;
    }

    if (!children) {
      acc[title] = {
        parent,
        type: "bookmark",
        title,
        url,
      };
    } else {
      acc[title] = {
        parent,
        type: "folder",
        title,
        children: mapper(children, title),
      };
    }
    return acc;
  }, {});
};
