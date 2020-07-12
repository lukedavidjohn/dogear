import _ from "lodash";
export const orderBy = (inputArr) => {
  return _.orderBy(inputArr, ["type", "title"], ["desc", "asc"]);
};
