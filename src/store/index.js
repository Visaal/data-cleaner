import Vue from "vue";
import Vuex from "vuex";
import { cloneDeep } from "lodash";

import {
  UPDATE_DATA_ROWS,
  UPDATE_FIELD_NAMES,
  UPDATE_FILE_NAME,
  SET_SELECTED_FIELD_NAMES,
  SET_NUMBER_OF_DISPLAYED_ROWS,
  SET_NEW_ROW_START_SLICE_INDEX,
  CREATE_SCHEMA,
} from "./mutation-types";

Vue.use(Vuex);

const state = {
  dataFieldNames: [],
  dataRows: [],
  dataFileName: "",
  dataSelectedFieldNames: "",
  numberOfRowsToDisplay: 100,
  rowStartSliceIndex: 0,
  dataSchema: {},
};

const mutations = {
  [UPDATE_DATA_ROWS](state, updatedDataRows) {
    state.dataRows = updatedDataRows;
  },
  [UPDATE_FIELD_NAMES](state, fieldNames) {
    state.dataFieldNames = fieldNames;
  },
  [UPDATE_FILE_NAME](state, fileName) {
    state.dataFileName = fileName;
  },
  [SET_SELECTED_FIELD_NAMES](state, selectedFieldNames) {
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
  _createSchema({ commit }, schema) {
    //TODO: Refactor to smaller helper functions
    schema = {};
    // create skeleton schema conataining all fields
    for (let i = 0; i < state.dataFieldNames.length; i++) {
      schema[state.dataFieldNames[i]] = {
        number: 0,
        text: 0,
        date: 0,
        likelyDataType: "text",
        valueCounts: {
          number: {},
          text: {},
          date: {},
        },
      };
    }

    // create count of the data type for each field value
    for (let i = 0; i < state.dataRows.length; i++) {
      for (let [fieldName, fieldValue] of Object.entries(state.dataRows[i])) {
        if (!isNaN(+fieldValue)) {
          schema[fieldName]["number"] += 1;
          schema[fieldName]["valueCounts"]["number"][fieldValue] =
            1 + (schema[fieldName]["valueCounts"]["number"][fieldValue] || 0);
        } else {
          schema[fieldName]["text"] += 1;
          schema[fieldName]["valueCounts"]["text"][fieldValue] =
            1 + (schema[fieldName]["valueCounts"]["text"][fieldValue] || 0);
        }
      }
    }

    // determine most likely data type for each field
    for (let i = 0; i < state.dataFieldNames.length; i++) {
      if (
        schema[state.dataFieldNames[i]]["number"] / state.dataRows.length >
        0.5
      ) {
        schema[state.dataFieldNames[i]]["likelyDataType"] = "number";
      }
    }
    console.log(schema);
    commit(CREATE_SCHEMA, schema);
  },
  setNumberOfRowsToDisplayAction({ commit }, numberSelected) {
    let convertedSelectedNumber = Number(numberSelected);
    commit(SET_NUMBER_OF_DISPLAYED_ROWS, convertedSelectedNumber);
  },
  setStartIndexNextPageAction({ commit }) {
    if (
      state.rowStartSliceIndex + state.numberOfRowsToDisplay <
      state.dataRows.length
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
  setDataTypeAction({ commit, dispatch }, ruleParameters) {
    console.log(commit);
    console.log(ruleParameters);
    let clonedDataRows = cloneDeep(state.dataRows);
    let fieldName = ruleParameters["fieldName"];
    for (let i = 0; i < clonedDataRows.length; i++) {
      if (isNaN(clonedDataRows[i][fieldName])) {
        clonedDataRows[i][fieldName] = ruleParameters["selectedOption"];
        // console.log(clonedDataRows[fieldName]);
      }
    }
    commit(UPDATE_DATA_ROWS, clonedDataRows);
    dispatch("_createSchema");
  },
};

const getters = {
  rowEndSliceIndex: (state) => {
    if (
      state.rowStartSliceIndex + state.numberOfRowsToDisplay <
      state.dataRows.length
    ) {
      return state.rowStartSliceIndex + state.numberOfRowsToDisplay;
    } else {
      return state.dataRows.length;
    }
  },
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters,
});
