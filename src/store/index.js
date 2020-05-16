import Vue from "vue";
import Vuex from "vuex";
import { cloneDeep } from "lodash";

import { UPDATE_DATA_ROWS, UPDATE_FIELD_NAMES } from "./mutation-types";

Vue.use(Vuex);

const state = {
  distinctFieldNames: [],
  dataRows: [],
};

const mutations = {
  [UPDATE_DATA_ROWS](state, updatedDataRows) {
    state.dataRows = updatedDataRows;
  },
  [UPDATE_FIELD_NAMES](state, fieldNames) {
    state.distinctFieldNames = fieldNames;
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
};

const getters = {};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters,
});
