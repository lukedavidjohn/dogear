export const searchFilter = (inputArr, inputStr) => {
  if (inputStr) {
    return inputArr.reduce((acc, inputObj) => {
      const { children, title } = inputObj;
      if (title.toLowerCase().includes(inputStr)) {
        acc.push(inputObj);
      }
      if (children) {
        const childrenAsArray = Object.values(children);
        acc.push(...searchFilter(childrenAsArray, inputStr));
      }
      return acc;
    }, []);
  } else {
    return [];
  }
};
