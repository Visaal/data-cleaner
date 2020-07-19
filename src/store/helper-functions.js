"use stict";

// import { isEmpty } from "lodash";

function setFilterValues(filterParams, activeFilterValues = {}) {
  // DATA MODEL CURRENT FILTERS:
  // activeFilterValues = {
  //   filterField: [filterValue1, filterValue2],
  //   filterField2: [filterValue1, filterValue2]
  // };
  let selectedField = filterParams["selectedField"];
  let fieldValuesSelected = filterParams["fieldValuesSelected"];

  if (!fieldValuesSelected.length) {
    delete activeFilterValues[selectedField];
  } else {
    Object.assign(activeFilterValues, {
      [selectedField]: [],
    });
    for (let i = 0; i < fieldValuesSelected.length; i++) {
      activeFilterValues[selectedField].push(fieldValuesSelected[i]);
    }
  }
  return activeFilterValues;
}

function getSelectedRowIndexes(
  dataSchema,
  filterParams,
  filteredDataRowIndexes = []
) {
  let selectedField = filterParams["selectedField"];
  let fieldValuesSelected = filterParams["fieldValuesSelected"];
  let distinctValueObject = {
    ...dataSchema[selectedField]["distinctValues"]["date"],
    ...dataSchema[selectedField]["distinctValues"]["number"],
    ...dataSchema[selectedField]["distinctValues"]["text"],
  };

  let rowIndexesToFilter = [];
  for (let i = 0; i < fieldValuesSelected.length; i++) {
    rowIndexesToFilter.push(...distinctValueObject[fieldValuesSelected[i]]);
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

function getDistinctValuesForField(dataSchema, field) {
  // TODO: MAKE THIS DYNAMIC SO DATA TYPES CAN BE EXPANDED
  let distinctValueObject = {
    ...dataSchema[field]["distinctValues"]["date"],
    ...dataSchema[field]["distinctValues"]["number"],
    ...dataSchema[field]["distinctValues"]["text"],
  };
  return distinctValueObject;
}

module.exports.getSelectedRowIndexes = getSelectedRowIndexes;
module.exports.setFilterValues = setFilterValues;
module.exports.getDistinctValuesForField = getDistinctValuesForField;
