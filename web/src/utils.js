export const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item._id] = item;
    return obj;
  }, {});

export const capitalize = (string = "") => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const isUpperCase = character => character === character.toUpperCase();

export const replaceWithName = (text, recipientName) => {
  if (!text) return "";
  if (!recipientName || recipientName.includes("you")) return text;

  // TODO: Make case insentive
  const result = text
    .replaceAll("you don't", `${recipientName} doesn't`)
    .replaceAll("do you", `does ${recipientName}`)
    .replaceAll("have you", `has ${recipientName}`)
    .replaceAll("you have", `${recipientName} has`)
    .replaceAll("are you", `is ${recipientName}`)
    .replaceAll("you are", `${recipientName} is`)
    .replaceAll("yourself", "themself") // TODO: Use gender?
    .replaceAll("your ", `${recipientName}'s `)
    .replaceAll("you", `${recipientName}`);
  return isUpperCase(text.charAt(0)) ? capitalize(result) : result;
};
