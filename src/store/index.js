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
  SET_FILTERED_ROW_INDEXES,
  SET_ACTIVE_FILTER_VALUES,
  SET_LAST_ACTION_TEXT,
  UPDATE_LOOKUP_MAPS,
} from "./mutation-types";

import {
  setFilterValues,
  getFilterRowIndexes,
} from "./filter-helper-functions";

import {
  createSchemaFieldSkeleton,
  countUniqueFieldValues,
  determineLikelyFieldDataType,
  determineIfConsistentDataType,
} from "./schema-helper-functions";

import {
  renameKeys,
  getFilteredOutDataRowIndexes,
} from "./general-helper-functions";

const DATATYPES = ["null", "number", "text", "date"];

Vue.use(Vuex);

// Helper functions
function _distinctValuesInArray(inputArray) {
  let valuesCountObject = {};
  for (let i = 0; i < inputArray.length; i++) {
    valuesCountObject[inputArray[i]] =
      1 + valuesCountObject[inputArray[i]] || 1;
  }
  return valuesCountObject;
}

const state = {
  dataFieldNames: [],
  dataRows: [],
  filteredDataRows: [],
  filteredDataRowIndexes: [],
  dataFileName: "",
  dataSelectedFieldNames: [],
  numberOfRowsToDisplay: 100,
  rowStartSliceIndex: 0,
  dataSchema: {},
  previousDataRows: [],
  previousDataSchema: {},
  previousDataFieldNames: [],
  previousDataSelectedFieldNames: [],
  activeFilterValues: {},
  lastActionText: "",
  lookupMaps: {},
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
  [SET_FILTERED_ROW_INDEXES](state, filteredRowIndexes) {
    state.filteredDataRowIndexes = filteredRowIndexes;
  },
  [SET_ACTIVE_FILTER_VALUES](state, filterValues) {
    state.activeFilterValues = filterValues;
  },
  [SET_LAST_ACTION_TEXT](state, latestText) {
    state.lastActionText = latestText;
  },
  [UPDATE_LOOKUP_MAPS](state, lookupMap) {
    state.lookupMaps = lookupMap;
  },
};

const actions = {
  //
  // DATA SETTING ACTIONS
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
    commit(SET_LAST_ACTION_TEXT, "Data successfully imported");
  },
  setSelectedFieldsAction({ commit }, selectedFieldNames) {
    commit(SET_SELECTED_FIELD_NAMES, selectedFieldNames);
  },
  //
  // HELPER ACTIONS
  _createSchema({ commit }) {
    let schema = createSchemaFieldSkeleton(state.dataFieldNames, DATATYPES);
    countUniqueFieldValues(schema, state.dataRows);
    determineLikelyFieldDataType(schema, DATATYPES);
    determineIfConsistentDataType(schema, DATATYPES);
    commit(CREATE_SCHEMA, schema);
  },
  _addNewField({ commit }, fieldDetailObject) {
    let fieldToAdd = fieldDetailObject["fieldToAdd"];
    let fieldToPlaceNextTo = fieldDetailObject["fieldToPlaceNextTo"];
    let clonedDataFieldNames = cloneDeep(state.dataFieldNames);
    let clonedSelectedFields = cloneDeep(state.dataSelectedFieldNames);

    if (!clonedDataFieldNames.includes(fieldToAdd)) {
      let dataFieldIndex = clonedDataFieldNames.indexOf(fieldToPlaceNextTo);
      let selectedDataFieldIndex = clonedSelectedFields.indexOf(
        fieldToPlaceNextTo
      );
      clonedDataFieldNames.splice(dataFieldIndex + 1, 0, fieldToAdd);
      clonedSelectedFields.splice(selectedDataFieldIndex + 1, 0, fieldToAdd);
    }

    commit(UPDATE_FIELD_NAMES, clonedDataFieldNames);
    commit(SET_SELECTED_FIELD_NAMES, clonedSelectedFields);
  },
  //
  // DATA CLEANING RULES
  capitaliseValuesAction({ commit, dispatch }, field) {
    // cloning dataRows as you should not work directly on the state values outside of a mutation
    // stict mode in vuex will highlight this
    let clonedDataRows = cloneDeep(state.dataRows);
    for (let i = 0; i < clonedDataRows.length; i++) {
      if (typeof clonedDataRows[i][field] === "string") {
        clonedDataRows[i][field] = clonedDataRows[i][field].toUpperCase();
      }
    }
    commit(UPDATE_DATA_ROWS, clonedDataRows);
    if (Object.keys(state.activeFilterValues).length > 0) {
      dispatch("updateActiveFilterAction", state.activeFilterValues);
    }
    commit(SET_LAST_ACTION_TEXT, `"${field}" set to upper case`);
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
  extractStringsAction({ commit, dispatch }, ruleParameters) {
    let fieldToAdd = ruleParameters["newField"];
    let stringsToFind = ruleParameters["stringsToFind"];
    let fieldToSearch = ruleParameters["fieldToSearch"];
    let clonedDataRows = cloneDeep(state.dataRows);
    let fieldDetailObject = {
      fieldToAdd: fieldToAdd,
      fieldToPlaceNextTo: fieldToSearch,
    };

    // Loop through rows, if value in field to search matches a value in strings to find then output it in the new field or just add an empty string
    for (let i = 0; i < clonedDataRows.length; i++) {
      let matches = stringsToFind.filter((string) =>
        clonedDataRows[i][fieldToSearch].includes(string)
      );
      clonedDataRows[i][fieldToAdd] = matches.toString();
      // TODO - decide how to handle cases where multiple matches are found
    }

    commit(UPDATE_DATA_ROWS, clonedDataRows);
    dispatch("_addNewField", fieldDetailObject);
    dispatch("_createSchema");
    if (Object.keys(state.activeFilterValues).length > 0) {
      dispatch("updateActiveFilterAction", state.activeFilterValues);
    }
    commit(
      SET_LAST_ACTION_TEXT,
      `Keyword search applied to "${fieldToSearch}" with matches shown in "${fieldToAdd}"`
    );
  },
  extractCharactersAction({ commit, dispatch }, ruleParameters) {
    let selectedOption = ruleParameters["selectedOption"];
    let fieldToExtractFrom = ruleParameters["fieldToExtractFrom"];
    let charactersFromFront = ruleParameters["charactersFromFront"];
    let charactersFromEnd = ruleParameters["charactersFromEnd"];
    let startCharacter = ruleParameters["startCharacter"];
    let endCharacter = ruleParameters["endCharacter"];
    let fieldToAdd = ruleParameters["newField"];
    let startIndex = 0;
    let endIndex = 0;
    let fieldDetailObject = {
      fieldToAdd: fieldToAdd,
      fieldToPlaceNextTo: fieldToExtractFrom,
    };
    let clonedDataRows = cloneDeep(state.dataRows);

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

    for (let i = 0; i < clonedDataRows.length; i++) {
      let slicedString = clonedDataRows[i][fieldToExtractFrom].slice(
        startIndex,
        endIndex
      );
      clonedDataRows[i][fieldToAdd] = slicedString;
    }

    commit(UPDATE_DATA_ROWS, clonedDataRows);
    dispatch("_addNewField", fieldDetailObject);
    dispatch("_createSchema");
    if (Object.keys(state.activeFilterValues).length > 0) {
      dispatch("updateActiveFilterAction", state.activeFilterValues);
    }
    commit(
      SET_LAST_ACTION_TEXT,
      `Characters extracted from "${fieldToExtractFrom}" into "${fieldToAdd}"`
    );
  },
  //RULE: JOIN FIELDS
  mergeFieldsAction({ commit, dispatch }, ruleParameters) {
    let fieldToAdd = ruleParameters["newField"];
    let fieldsToJoin = ruleParameters["fieldsToJoin"];
    let delimiter = ruleParameters["delimiter"];
    let clonedDataRows = cloneDeep(state.dataRows);
    let fieldDetailObject = {
      fieldToAdd: fieldToAdd,
      fieldToPlaceNextTo: fieldsToJoin[fieldsToJoin.length - 1],
    };

    for (let i = 0; i < clonedDataRows.length; i++) {
      let newFieldValue = fieldsToJoin
        .map((field) => clonedDataRows[i][field])
        .join(delimiter);
      clonedDataRows[i][fieldToAdd] = newFieldValue;
    }

    commit(UPDATE_DATA_ROWS, clonedDataRows);
    dispatch("_addNewField", fieldDetailObject);
    dispatch("_createSchema");
    if (Object.keys(state.activeFilterValues).length > 0) {
      dispatch("updateActiveFilterAction", state.activeFilterValues);
    }
    commit(
      SET_LAST_ACTION_TEXT,
      `"${fieldsToJoin}" joined into "${fieldToAdd}"`
    );
  },
  // RULE: CREATE LOOKUP
  createLookupAction({ commit, dispatch }, ruleParameters) {
    let fieldToAdd = ruleParameters["newField"];
    let baseField = ruleParameters["baseField"];
    let lookupMap = ruleParameters["valueMap"];
    let clonedDataRows = cloneDeep(state.dataRows);
    let clonedLookupMaps = cloneDeep(state.lookupMaps);
    let fieldDetailObject = {
      fieldToAdd: fieldToAdd,
      fieldToPlaceNextTo: baseField,
    };

    for (let i = 0; i < clonedDataRows.length; i++) {
      let baseFieldValue = clonedDataRows[i][baseField];
      if (!baseFieldValue.length) {
        baseFieldValue = "null";
      }
      clonedDataRows[i][fieldToAdd] = lookupMap[baseFieldValue];
    }

    // Add lookup map for field to state
    clonedLookupMaps[baseField] = [{ [fieldToAdd]: lookupMap }];

    commit(UPDATE_DATA_ROWS, clonedDataRows);
    dispatch("_addNewField", fieldDetailObject);
    dispatch("_createSchema");
    if (Object.keys(state.activeFilterValues).length > 0) {
      dispatch("updateActiveFilterAction", state.activeFilterValues);
    }
    commit(UPDATE_LOOKUP_MAPS, clonedLookupMaps);
    commit(
      SET_LAST_ACTION_TEXT,
      `"${fieldToAdd}" created based on lookup of "${baseField}" values`
    );
  },
  //
  // ACTION BAR ACTIONS
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
  undoLastAction({ commit }) {
    commit(UNDO_LAST_CHANGE);
  },
  changeFieldNamesAction({ commit, dispatch }, nameMap) {
    let clonedDataRows = cloneDeep(state.dataRows);
    let clonedDataFieldNames = cloneDeep(state.dataFieldNames);
    let clonedSelectedFields = cloneDeep(state.dataSelectedFieldNames);

    // rename fields in data
    for (let i = 0; i < clonedDataRows.length; i++) {
      clonedDataRows[i] = renameKeys(nameMap, clonedDataRows[i]);
    }

    // rename fields in field name lists
    for (let [originalName, newName] of Object.entries(nameMap)) {
      let indexAllFields = clonedDataFieldNames.indexOf(originalName);
      clonedDataFieldNames[indexAllFields] = newName;
      let indexSelectedFields = clonedSelectedFields.indexOf(originalName);
      clonedSelectedFields[indexSelectedFields] = newName;
    }

    commit(UPDATE_DATA_ROWS, clonedDataRows);
    commit(UPDATE_FIELD_NAMES, clonedDataFieldNames);
    commit(SET_SELECTED_FIELD_NAMES, clonedSelectedFields);
    dispatch("_createSchema");
  },
  //
  // FILTERING ACTIONS
  filterDataAction({ commit }, filterParams) {
    let filterValuesClone = cloneDeep(state.activeFilterValues);
    let filterValues = setFilterValues(filterParams, filterValuesClone);
    let filteredRowIndexes = getFilterRowIndexes(
      state.dataSchema,
      filterValues
    );

    let filteredDataRows = filteredRowIndexes.map(
      (rowIndex) => state.dataRows[rowIndex]
    );

    commit(SET_FILTERED_ROWS, filteredDataRows);
    commit(SET_FILTERED_ROW_INDEXES, filteredRowIndexes);
    commit(SET_ACTIVE_FILTER_VALUES, filterValues);
    commit(SET_NEW_ROW_START_SLICE_INDEX, 0);
  },
  updateActiveFilterAction({ commit }, filterValues) {
    let filteredRowIndexes = getFilterRowIndexes(
      state.dataSchema,
      filterValues
    );

    let filteredDataRows = filteredRowIndexes.map(
      (rowIndex) => state.dataRows[rowIndex]
    );

    commit(SET_FILTERED_ROWS, filteredDataRows);
    commit(SET_FILTERED_ROW_INDEXES, filteredRowIndexes);
    commit(SET_ACTIVE_FILTER_VALUES, filterValues);
  },
  deleteRowsAction({ commit, dispatch }, deleteAction) {
    let dataRowsToKeep;
    if (deleteAction === "keep") {
      dataRowsToKeep = cloneDeep(state.filteredDataRows);
    } else if (deleteAction === "delete") {
      let dataRowsIndexesToKeep = getFilteredOutDataRowIndexes(
        state.dataRows,
        state.filteredDataRowIndexes
      );
      let clonedDataRows = cloneDeep(state.dataRows);
      dataRowsToKeep = dataRowsIndexesToKeep.map((i) => clonedDataRows[i]);
    }
    commit(UPDATE_DATA_ROWS, dataRowsToKeep);
    dispatch("_createSchema");
    commit(SET_FILTERED_ROWS, []);
    commit(SET_FILTERED_ROW_INDEXES, []);
    commit(SET_ACTIVE_FILTER_VALUES, {});
    commit(SET_NEW_ROW_START_SLICE_INDEX, 0);
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
    if (Object.keys(state.activeFilterValues).length > 0) {
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
