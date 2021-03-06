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
      if (fieldValue.length === 0) {
        (schema[fieldName]["distinctValues"]["null"]["null"] =
          schema[fieldName]["distinctValues"]["null"]["null"] || []).push(i);
        schema[fieldName]["null"] += 1;
      } else if (!isNaN(+fieldValue)) {
        (schema[fieldName]["distinctValues"]["number"][fieldValue] =
          schema[fieldName]["distinctValues"]["number"][fieldValue] || []).push(
          i
        );
        schema[fieldName]["number"] += 1;
      } else if (!DateTime.fromISO(fieldValue).invalid) {
        (schema[fieldName]["distinctValues"]["date"][fieldValue] =
          schema[fieldName]["distinctValues"]["date"][fieldValue] || []).push(
          i
        );
        schema[fieldName]["date"] += 1;
      } else {
        (schema[fieldName]["distinctValues"]["text"][fieldValue] =
          schema[fieldName]["distinctValues"]["text"][fieldValue] || []).push(
          i
        );
        schema[fieldName]["text"] += 1;
      }
    }
  }
  return schema;
}

function determineLikelyFieldDataType(schema, dataTypes) {
  // determine most likely data type for each field
  for (let [, fieldValue] of Object.entries(schema)) {
    let maxCountDataType = dataTypes.reduce((a, b) =>
      fieldValue[a] > fieldValue[b] ? a : b
    );
    fieldValue["likelyDataType"] = maxCountDataType;
  }
  return schema;
}

function determineIfConsistentDataType(schema, dataTypes) {
  // determine if field values have inconsistent data types
  for (let [fieldName, fieldSchema] of Object.entries(schema)) {
    let fieldDataTypeCounts = [];
    for (let i = 0; i < dataTypes.length; i++) {
      fieldDataTypeCounts.push(fieldSchema[dataTypes[i]]);
    }
    fieldDataTypeCounts = fieldDataTypeCounts.filter((count) => count > 0);
    if (fieldDataTypeCounts.length > 1) {
      schema[fieldName]["inconsistentDataTypes"] = true;
    }
  }
  return schema;
}

module.exports.determineIfConsistentDataType = determineIfConsistentDataType;
module.exports.determineLikelyFieldDataType = determineLikelyFieldDataType;
module.exports.countUniqueFieldValues = countUniqueFieldValues;
module.exports.createSchemaFieldSkeleton = createSchemaFieldSkeleton;
