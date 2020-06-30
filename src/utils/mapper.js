export const mapper = (tree) => {
  return tree.map((branch) => {
    const { children, title, url } = branch;
    if (!children) {
      return {
        type: "bookmark",
        title,
        url,
      };
    } else {
      return {
        type: "folder",
        title,
        children: mapper(children),
      };
    }
  });
};
