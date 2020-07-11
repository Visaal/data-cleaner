import Vue from "vue";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import { DateTime } from "luxon";

import {
  UPDATE_DATA_ROWS,
  UPDATE_FIELD_NAMES,
  UPDATE_FILE_NAME,
  SET_SELECTED_FIELD_NAMES,
  SET_NUMBER_OF_DISPLAYED_ROWS,
  SET_NEW_ROW_START_SLICE_INDEX,
  CREATE_SCHEMA,
  UNDO_LAST_CHANGE,
  SET_FILTERED_ROWS,
} from "./mutation-types";

Vue.use(Vuex);

// Helper functions
function _createSchemaFieldSkeleton() {
  let schema = {};
  for (let i = 0; i < state.dataFieldNames.length; i++) {
    schema[state.dataFieldNames[i]] = {
      number: 0,
      text: 0,
      date: 0,
      inconsistentDataTypes: false,
      likelyDataType: "text",
      distinctValues: {
        number: {},
        text: {},
        date: {},
      },
    };
  }
  return schema;
}

function _countLikelyDataTypes(schema) {
  let potentialDateFields = _checkForPotentialDateFields();
  // create count of the data type for each field value
  // TODO: check for additional date formats rather than just ISO date
  for (let i = 0; i < state.dataRows.length; i++) {
    for (let [fieldName, fieldValue] of Object.entries(state.dataRows[i])) {
      if (!isNaN(+fieldValue)) {
        schema[fieldName]["number"] += 1;
      } else if (
        potentialDateFields.includes(fieldName) &&
        !DateTime.fromISO(fieldValue).invalid
      ) {
        schema[fieldName]["date"] += 1;
      } else {
        schema[fieldName]["text"] += 1;
      }
    }
  }
}

function _determineLikelyFieldDataType(schema) {
  // determine most likely data type for each field
  // TO DO: restructure schema to group data type counts into their own object
  for (let i = 0; i < state.dataFieldNames.length; i++) {
    let dataTypeKeys = ["number", "date", "text"];
    let maxCountDataType = dataTypeKeys.reduce((a, b) =>
      schema[state.dataFieldNames[i]][a] > schema[state.dataFieldNames[i]][b]
        ? a
        : b
    );
    schema[state.dataFieldNames[i]]["likelyDataType"] = maxCountDataType;
  }
}

function _countUniqueFieldValues(schema, dataRows = state.dataRows) {
  let potentialDateFields = _checkForPotentialDateFields();
  for (let i = 0; i < dataRows.length; i++) {
    for (let [fieldName, fieldValue] of Object.entries(dataRows[i])) {
      if (!isNaN(+fieldValue)) {
        (schema[fieldName]["distinctValues"]["number"][fieldValue] =
          schema[fieldName]["distinctValues"]["number"][fieldValue] || []).push(
          i
        );
      } else if (
        potentialDateFields.includes(fieldName) &&
        !DateTime.fromISO(fieldValue).invalid
      ) {
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
  console.log(schema);
}

function _distinctValuesInArray(inputArray) {
  let valuesCountObject = {};
  for (let i = 0; i < inputArray.length; i++) {
    valuesCountObject[inputArray[i]] =
      1 + valuesCountObject[inputArray[i]] || 1;
  }
  return valuesCountObject;
}

function _determineIfConsistentDataType(schema) {
  // determine if field values have inconsistent data types
  for (let [fieldName, fieldSchema] of Object.entries(schema)) {
    let fieldDataTypeCounts = [
      fieldSchema["number"],
      fieldSchema["text"],
      fieldSchema["date"],
    ].filter((count) => count > 0);

    if (fieldDataTypeCounts.length > 1) {
      schema[fieldName]["inconsistentDataTypes"] = true;
    }
  }
}

function _checkForPotentialDateFields() {
  // TODO: maybe expand logic to check value of fields rather than just looking for word 'date'
  let potentialDateFields = [];
  for (let i = 0; i < state.dataFieldNames.length; i++) {
    if (state.dataFieldNames[i].toLowerCase().includes("date")) {
      potentialDateFields.push(state.dataFieldNames[i]);
    }
  }
  return potentialDateFields;
}

const state = {
  dataFieldNames: [],
  dataRows: [],
  filteredDataRows: [],
  dataFileName: "",
  dataSelectedFieldNames: [],
  numberOfRowsToDisplay: 100,
  rowStartSliceIndex: 0,
  dataSchema: {},
  previousDataRows: [],
  previousDataSchema: {},
  previousDataFieldNames: [],
  previousDataSelectedFieldNames: [],
};

const mutations = {
  [UPDATE_DATA_ROWS](state, updatedDataRows) {
    if (state.dataRows.length > 0) {
      state.previousDataRows = state.dataRows;
      state.previousDataSchema = state.dataSchema;
    }
    state.dataRows = updatedDataRows;
  },
  [UPDATE_FIELD_NAMES](state, fieldNames) {
    state.previousDataFieldNames = state.dataFieldNames;
    state.dataFieldNames = fieldNames;
  },
  [UPDATE_FILE_NAME](state, fileName) {
    state.dataFileName = fileName;
  },
  [SET_SELECTED_FIELD_NAMES](state, selectedFieldNames) {
    state.previousDataSelectedFieldNames = state.dataSelectedFieldNames;
    state.dataSelectedFieldNames = selectedFieldNames;
  },
  [SET_NUMBER_OF_DISPLAYED_ROWS](state, numberSelected) {
    state.numberOfRowsToDisplay = numberSelected;
  },
  [SET_NEW_ROW_START_SLICE_INDEX](state, newStartIndex) {
    state.rowStartSliceIndex = newStartIndex;
  },
  [CREATE_SCHEMA](state, schema) {
    state.dataSchema = schema;
  },
  [UNDO_LAST_CHANGE](state) {
    if (state.previousDataRows.length > 0) {
      state.dataRows = state.previousDataRows;
      state.dataSchema = state.previousDataSchema;
      state.previousDataRows = [];
      state.previousDataSchema = {};
    }
    if (state.previousDataFieldNames.length > 0) {
      state.dataFieldNames = state.previousDataFieldNames;
      state.dataSelectedFieldNames = state.previousDataSelectedFieldNames;
      state.previousDataFieldNames = [];
      state.previousDataSelectedFieldNames = [];
    }
  },
  [SET_FILTERED_ROWS](state, filteredRows) {
    state.filteredDataRows = filteredRows;
  },
};

const actions = {
  capitaliseValuesAction({ commit }, field) {
    // cloning dataRows as you should not work directly on the state values outside of a mutation
    // stict mode in vuex will highlight this
    let clonedDataRows = cloneDeep(state.dataRows);
    for (let i = 0; i < clonedDataRows.length; i++) {
      if (typeof clonedDataRows[i][field] === "string") {
        clonedDataRows[i][field] = clonedDataRows[i][field].toUpperCase();
      }
    }
    commit(UPDATE_DATA_ROWS, clonedDataRows);
  },
  setFieldNamesAction({ commit }, fieldNames) {
    commit(UPDATE_FIELD_NAMES, fieldNames);
  },
  setDataAction({ commit }, fileData) {
    commit(UPDATE_DATA_ROWS, fileData);
  },
  getDataSourceData() {
    return state.dataRows;
  },
  updateDataAction({ commit, dispatch }, dataObject) {
    commit(UPDATE_FILE_NAME, dataObject["fileName"]);
    commit(UPDATE_DATA_ROWS, dataObject["data"]);
    commit(UPDATE_FIELD_NAMES, dataObject["fieldNames"]);
    dispatch("_createSchema");
  },
  setSelectedFieldsAction({ commit }, selectedFieldNames) {
    commit(SET_SELECTED_FIELD_NAMES, selectedFieldNames);
  },
  _createSchema({ commit }) {
    //TODO: Remove helper functions to separate file
    let schema = _createSchemaFieldSkeleton();
    _countLikelyDataTypes(schema);
    _determineLikelyFieldDataType(schema);
    _countUniqueFieldValues(schema);
    _determineIfConsistentDataType(schema);
    commit(CREATE_SCHEMA, schema);
  },
  setNumberOfRowsToDisplayAction({ commit }, numberSelected) {
    let convertedSelectedNumber = Number(numberSelected);
    commit(SET_NUMBER_OF_DISPLAYED_ROWS, convertedSelectedNumber);
  },
  setStartIndexNextPageAction({ commit, getters }) {
    if (
      state.rowStartSliceIndex + state.numberOfRowsToDisplay <
      getters.dataRowsToDisplay.length
    ) {
      let newStartIndex =
        state.rowStartSliceIndex + state.numberOfRowsToDisplay;
      commit(SET_NEW_ROW_START_SLICE_INDEX, newStartIndex);
    }
  },
  setStartIndexPreviousPageAction({ commit }) {
    let newStartIndex = 0;
    if (state.rowStartSliceIndex - state.numberOfRowsToDisplay >= 0) {
      newStartIndex = state.rowStartSliceIndex - state.numberOfRowsToDisplay;
    } else {
      newStartIndex = 0;
    }
    commit(SET_NEW_ROW_START_SLICE_INDEX, newStartIndex);
  },
  setDataTypeAction({ commit }, ruleParameters) {
    let clonedDataRows = cloneDeep(state.dataRows);
    let clonedSchema = cloneDeep(state.dataSchema);

    let fieldName = ruleParameters["fieldName"];
    let selectedDataType = ruleParameters["dataTypeName"].toLowerCase();
    let selectedOption = ruleParameters["selectedOption"];

    clonedSchema[fieldName]["likelyDataType"] = selectedDataType;
    clonedSchema[fieldName][selectedDataType] = clonedDataRows.length;
    clonedSchema[fieldName]["inconsistentDataTypes"] = false;

    if (selectedDataType === "number") {
      let fieldValueArray = [];
      for (let i = 0; i < clonedDataRows.length; i++) {
        if (isNaN(clonedDataRows[i][fieldName])) {
          clonedDataRows[i][fieldName] = selectedOption;
        }
        fieldValueArray.push(clonedDataRows[i][fieldName]);
      }
      clonedSchema[fieldName]["distinctValues"][
        "number"
      ] = _distinctValuesInArray(fieldValueArray);
      clonedSchema[fieldName]["distinctValues"]["text"] = {};
      clonedSchema[fieldName]["distinctValues"]["date"] = {};
    }

    if (selectedDataType === "date") {
      let fieldValueArray = [];
      for (let i = 0; i < clonedDataRows.length; i++) {
        if (DateTime.fromISO(clonedDataRows[i][fieldName]).invalid) {
          clonedDataRows[i][fieldName] = selectedOption;
        }
        fieldValueArray.push(clonedDataRows[i][fieldName]);
      }
      clonedSchema[fieldName]["distinctValues"][
        "date"
      ] = _distinctValuesInArray(fieldValueArray);
      clonedSchema[fieldName]["distinctValues"]["number"] = {};
      clonedSchema[fieldName]["distinctValues"]["text"] = {};
    }

    if (selectedDataType === "text") {
      let mergeddistinctValues = {
        ...clonedSchema[fieldName]["distinctValues"]["text"],
        ...clonedSchema[fieldName]["distinctValues"]["number"],
        ...clonedSchema[fieldName]["distinctValues"]["date"],
      };
      clonedSchema[fieldName]["distinctValues"]["text"] = mergeddistinctValues;
      clonedSchema[fieldName]["distinctValues"]["number"] = {};
      clonedSchema[fieldName]["distinctValues"]["date"] = {};
    }

    commit(UPDATE_DATA_ROWS, clonedDataRows);
    commit(CREATE_SCHEMA, clonedSchema);
  },
  undoLastAction({ commit }) {
    commit(UNDO_LAST_CHANGE);
  },
  extractStringsAction({ commit }, ruleParameters) {
    let fieldToAdd = ruleParameters["newField"];
    let stringsToFind = ruleParameters["stringsToFind"];
    let fieldToSearch = ruleParameters["fieldToSearch"];
    let clonedDataRows = cloneDeep(state.dataRows);
    let clonedDataFieldNames = cloneDeep(state.dataFieldNames);
    let clonedSelectedFields = cloneDeep(state.dataSelectedFieldNames);
    let clonedSchema = cloneDeep(state.dataSchema);
    let fieldValueArray = [];

    if (!clonedDataFieldNames.includes(fieldToAdd)) {
      // place new field next to the field being searched
      let dataFieldIndex = clonedDataFieldNames.indexOf(fieldToSearch);
      let selectedDataFieldIndex = clonedSelectedFields.indexOf(fieldToSearch);
      clonedDataFieldNames.splice(dataFieldIndex + 1, 0, fieldToAdd);
      clonedSelectedFields.splice(selectedDataFieldIndex + 1, 0, fieldToAdd);
    }

    // Loop through rows, if value in field to search matches a value in strings to find then output it in the new field or just add an empty string
    for (let i = 0; i < clonedDataRows.length; i++) {
      let matches = stringsToFind.filter((string) =>
        clonedDataRows[i][fieldToSearch].includes(string)
      );
      clonedDataRows[i][fieldToAdd] = matches.toString();
      // TODO - decide how to handle cases where multiple matches are found
      fieldValueArray.push(matches);
    }

    // Update schema values
    clonedSchema[fieldToAdd] = {
      number: 0,
      text: clonedDataRows.length,
      date: 0,
      inconsistentDataTypes: false,
      likelyDataType: "text",
      distinctValues: {
        number: {},
        text: _distinctValuesInArray(fieldValueArray),
        date: {},
      },
    };

    commit(CREATE_SCHEMA, clonedSchema);
    commit(UPDATE_FIELD_NAMES, clonedDataFieldNames);
    commit(SET_SELECTED_FIELD_NAMES, clonedSelectedFields);
    commit(UPDATE_DATA_ROWS, clonedDataRows);
  },
  extractCharactersAction({ commit }, ruleParameters) {
    let selectedOption = ruleParameters["selectedOption"];
    let fieldToExtractFrom = ruleParameters["fieldToExtractFrom"];
    let charactersFromFront = ruleParameters["charactersFromFront"];
    let charactersFromEnd = ruleParameters["charactersFromEnd"];
    let startCharacter = ruleParameters["startCharacter"];
    let endCharacter = ruleParameters["endCharacter"];
    let fieldToAdd = ruleParameters["newField"];

    let startIndex = 0;
    let endIndex = 0;

    let clonedDataRows = cloneDeep(state.dataRows);
    let clonedDataFieldNames = cloneDeep(state.dataFieldNames);
    let clonedSelectedFields = cloneDeep(state.dataSelectedFieldNames);
    let clonedSchema = cloneDeep(state.dataSchema);
    let fieldValueArray = [];

    if (selectedOption === "front") {
      startIndex = 0;
      endIndex = charactersFromFront;
    }

    if (selectedOption === "end") {
      startIndex = -charactersFromEnd;
      endIndex = undefined;
    }

    if (selectedOption === "between") {
      startIndex = startCharacter;
      endIndex = -endCharacter;
      if (startCharacter === 0) {
        startIndex = undefined;
      }
      if (endCharacter === 0) {
        endIndex = undefined;
      }
    }

    if (!clonedDataFieldNames.includes(fieldToAdd)) {
      // place new field next to the field being sliced
      let dataFieldIndex = clonedDataFieldNames.indexOf(fieldToExtractFrom);
      let selectedDataFieldIndex = clonedSelectedFields.indexOf(
        fieldToExtractFrom
      );
      clonedDataFieldNames.splice(dataFieldIndex + 1, 0, fieldToAdd);
      clonedSelectedFields.splice(selectedDataFieldIndex + 1, 0, fieldToAdd);
    }

    for (let i = 0; i < clonedDataRows.length; i++) {
      let slicedString = clonedDataRows[i][fieldToExtractFrom].slice(
        startIndex,
        endIndex
      );

      clonedDataRows[i][fieldToAdd] = slicedString;
      fieldValueArray.push(slicedString);
    }

    // Update schema values
    clonedSchema[fieldToAdd] = {
      number: 0,
      text: clonedDataRows.length,
      date: 0,
      inconsistentDataTypes: false,
      likelyDataType: "text",
      distinctValues: {
        number: {},
        text: _distinctValuesInArray(fieldValueArray),
        date: {},
      },
    };

    commit(CREATE_SCHEMA, clonedSchema);
    commit(UPDATE_FIELD_NAMES, clonedDataFieldNames);
    commit(SET_SELECTED_FIELD_NAMES, clonedSelectedFields);
    commit(UPDATE_DATA_ROWS, clonedDataRows);
  },
  filterDataAction({ commit }, filterParams) {
    let selectedField = filterParams["selectedField"];
    let filterValue = filterParams["filterValue"];
    let distinctValueObject = {
      ...state.dataSchema[selectedField]["distinctValues"]["date"],
      ...state.dataSchema[selectedField]["distinctValues"]["number"],
      ...state.dataSchema[selectedField]["distinctValues"]["text"],
    };

    let rowsToKeep = distinctValueObject[filterValue];
    let filteredDataRows = rowsToKeep.map(
      (rowIndex) => state.dataRows[rowIndex]
    );

    commit(SET_FILTERED_ROWS, filteredDataRows);
  },
};

const getters = {
  rowEndSliceIndex: (state, getters) => {
    if (
      state.rowStartSliceIndex + state.numberOfRowsToDisplay <
      getters.dataRowsToDisplay.length
    ) {
      return state.rowStartSliceIndex + state.numberOfRowsToDisplay;
    } else {
      return getters.dataRowsToDisplay.length;
    }
  },
  textFields: (state) => {
    return state.dataSelectedFieldNames.filter(
      (field) => state.dataSchema[field]["likelyDataType"] === "text"
    );
  },
  dataRowsToDisplay: (state) => {
    if (state.filteredDataRows.length) {
      return state.filteredDataRows;
    }
    return state.dataRows;
  },
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters,
});
