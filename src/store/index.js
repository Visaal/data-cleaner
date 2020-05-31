import Vue from "vue";
import Vuex from "vuex";
import { cloneDeep } from "lodash";

import {
  UPDATE_DATA_ROWS,
  UPDATE_FIELD_NAMES,
  UPDATE_FILE_NAME,
  SET_SELECTED_FIELD_NAMES,
  SET_NUMBER_OF_DISPLAYED_ROWS,
  SET_ROW_START_SLICE_INDEX_NEXT_PAGE,
  SET_ROW_START_SLICE_INDEX_PREVIOUS_PAGE,
} from "./mutation-types";

Vue.use(Vuex);

const state = {
  dataFieldNames: [],
  dataRows: [],
  dataFileName: "",
  dataSelectedFieldNames: "",
  numberOfRowsToDisplay: 100,
  rowStartSliceIndex: 0,
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
  [SET_ROW_START_SLICE_INDEX_NEXT_PAGE](state) {
    state.rowStartSliceIndex += state.numberOfRowsToDisplay;
  },
  [SET_ROW_START_SLICE_INDEX_PREVIOUS_PAGE](state) {
    state.rowStartSliceIndex -= state.numberOfRowsToDisplay;
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
  updateDataAction({ commit }, dataObject) {
    commit(UPDATE_FILE_NAME, dataObject["fileName"]);
    commit(UPDATE_DATA_ROWS, dataObject["data"]);
    commit(UPDATE_FIELD_NAMES, dataObject["fieldNames"]);
  },
  setSelectedFieldsAction({ commit }, selectedFieldNames) {
    commit(SET_SELECTED_FIELD_NAMES, selectedFieldNames);
  },
  setNumberOfRowsToDisplayAction({ commit }, numberSelected) {
    let convertedSelectedNumber = Number(numberSelected);
    commit(SET_NUMBER_OF_DISPLAYED_ROWS, convertedSelectedNumber);
  },
  setStartIndexNextPageAction({ commit }) {
    commit(SET_ROW_START_SLICE_INDEX_NEXT_PAGE);
  },
  setStartIndexPreviousPageAction({ commit }) {
    commit(SET_ROW_START_SLICE_INDEX_PREVIOUS_PAGE);
  },
};

const getters = {
  rowEndSliceIndex: (state) => {
    return state.rowStartSliceIndex + state.numberOfRowsToDisplay;
  },
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters,
});
