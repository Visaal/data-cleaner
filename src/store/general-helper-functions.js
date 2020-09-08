"use-strict";

let renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );

function getFilteredOutDataRowIndexes(data, filteredDataRowIndexes) {
  let filteredOutDataRowIndexes = [];
  for (let i = 0; i < data.length; i++) {
    if (!filteredDataRowIndexes.includes(i)) {
      filteredOutDataRowIndexes.push(i);
    }
  }
  return filteredOutDataRowIndexes;
}

module.exports.renameKeys = renameKeys;
module.exports.getFilteredOutDataRowIndexes = getFilteredOutDataRowIndexes;
