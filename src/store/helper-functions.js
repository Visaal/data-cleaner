"use stict";

// DATA MODEL CURRENT FILTERS:
// let filtersInPlace = {
//   filterField: { filterValue: [filterValueRows] },
// };

function getSelectedRowIndexes(
  dataSchema,
  filterParams,
  filteredDataRowIndexes = []
) {
  let selectedField = filterParams["selectedField"];
  let filterValues = filterParams["filterValues"];
  let distinctValueObject = {
    ...dataSchema[selectedField]["distinctValues"]["date"],
    ...dataSchema[selectedField]["distinctValues"]["number"],
    ...dataSchema[selectedField]["distinctValues"]["text"],
  };

  let rowIndexesToFilter = [];
  for (let i = 0; i < filterValues.length; i++) {
    rowIndexesToFilter.push(...distinctValueObject[filterValues[i]]);
  }

  let rowIndexesToKeep = [];
  if (filteredDataRowIndexes.length) {
    // If already using a filter get the intersection of the existing filter rows and the new filter rows selected
    rowIndexesToKeep = rowIndexesToFilter.filter((value) =>
      filteredDataRowIndexes.includes(value)
    );
  } else {
    rowIndexesToKeep = [...rowIndexesToFilter];
  }
  return rowIndexesToKeep;
}

module.exports.getSelectedRowIndexes = getSelectedRowIndexes;
