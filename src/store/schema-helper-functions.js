"use-strict";

// Note can not use import {DateTime} from "luxon"; syntax
// https://stackoverflow.com/questions/42449999/webpack-import-module-exports-in-the-same-module-caused-error
// https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export
const { DateTime } = require("luxon");

function createSchemaFieldSkeleton(fieldNames, dataTypesArray) {
  let schema = {};
  for (let i = 0; i < fieldNames.length; i++) {
    schema[fieldNames[i]] = {
      userCreatedField: false,
      inconsistentDataTypes: false,
      likelyDataType: "text",
      distinctValues: {},
    };
    for (let j = 0; j < dataTypesArray.length; j++) {
      schema[fieldNames[i]][dataTypesArray[j]] = 0;
      schema[fieldNames[i]]["distinctValues"][dataTypesArray[j]] = {};
    }
  }
  return schema;
}

function countUniqueFieldValues(dataSchema, dataRows) {
  let schema = dataSchema;
  for (let i = 0; i < dataRows.length; i++) {
    for (let [fieldName, fieldValue] of Object.entries(dataRows[i])) {
      if (!isNaN(+fieldValue)) {
        (schema[fieldName]["distinctValues"]["number"][fieldValue] =
          schema[fieldName]["distinctValues"]["number"][fieldValue] || []).push(
          i
        );
      } else if (!DateTime.fromISO(fieldValue).invalid) {
        (schema[fieldName]["distinctValues"]["date"][fieldValue] =
          schema[fieldName]["distinctValues"]["date"][fieldValue] || []).push(
          i
        );
      } else {
        (schema[fieldName]["distinctValues"]["text"][fieldValue] =
          schema[fieldName]["distinctValues"]["text"][fieldValue] || []).push(
          i
        );
      }
    }
  }
  return schema;
}

module.exports.countUniqueFieldValues = countUniqueFieldValues;
module.exports.createSchemaFieldSkeleton = createSchemaFieldSkeleton;
