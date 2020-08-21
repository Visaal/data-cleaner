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

function getFilterRowIndexes(dataSchema, selectedFilterValues) {
  let filterFields = Object.keys(selectedFilterValues);
  let filteredRowIndexes = [];
  for (let i = 0; i < filterFields.length; i++) {
    let selectedField = filterFields[i];
    let fieldValueIndexes = getDistinctValuesForField(
      dataSchema,
      selectedField
    );
    let selectedValuesForField = selectedFilterValues[selectedField];

    let rowIndexesForSelectedValue = [];
    for (let j = 0; j < selectedValuesForField.length; j++) {
      rowIndexesForSelectedValue.push(
        ...fieldValueIndexes[selectedValuesForField[j]]
      );
    }
    if (i === 0) {
      filteredRowIndexes.push(...rowIndexesForSelectedValue);
    } else {
      // If more than one filter field get the intersection of the filter rows for existing filters and new filter field
      filteredRowIndexes = rowIndexesForSelectedValue.filter((value) =>
        filteredRowIndexes.includes(value)
      );
    }
  }
  filteredRowIndexes = filteredRowIndexes.sort(function(a, b) {
    return a - b;
  });
  return filteredRowIndexes;
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

module.exports.setFilterValues = setFilterValues;
module.exports.getDistinctValuesForField = getDistinctValuesForField;
module.exports.getFilterRowIndexes = getFilterRowIndexes;
