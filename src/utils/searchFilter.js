export const searchFilter = (inputArr, inputStr) => {
  if (inputStr) {
    return inputArr.filter((ele) => {
      return ele.title.toLowerCase().includes(inputStr) === true;
    });
  } else {
    return [];
  }
};
