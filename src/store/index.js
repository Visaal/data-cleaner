import Vue from "vue";
import Vuex from "vuex";
import { cloneDeep } from "lodash";

import { UPDATE_DATA_ROWS } from "./mutation-types";

Vue.use(Vuex);

const state = {
  distinctFieldNames: ["album", "year", "US_peak_chart_post"],
  dataRows: [
    {
      album: "The White Stripes",
      year: 1999,
      US_peak_chart_post: "-",
    },
    {
      album: "De Stijl",
      year: 2000,
      US_peak_chart_post: "-",
    },
    {
      album: "White Blood Cells",
      year: 2001,
      US_peak_chart_post: 61,
    },
  ],
};

const mutations = {
  [UPDATE_DATA_ROWS](state, updatedDataRows) {
    state.dataRows = updatedDataRows;
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
