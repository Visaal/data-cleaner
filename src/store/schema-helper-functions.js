"use-strict";

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

module.exports.createSchemaFieldSkeleton = createSchemaFieldSkeleton;
