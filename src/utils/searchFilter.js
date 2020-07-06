export const searchFilter = (inputArr, inputStr) => {
  if (inputStr) {
    return inputArr.reduce((acc, inputObj) => {
      const { children, title } = inputObj;
      if (title.toLowerCase().includes(inputStr)) {
        acc.push(inputObj);
      }
      if (children) {
        acc.push(...searchFilter(children, inputStr));
      }
      return acc;
    }, []);
  } else {
    return [];
  }
};
