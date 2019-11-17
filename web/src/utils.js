export const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item._id] = item;
    return obj;
  }, {});

export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
