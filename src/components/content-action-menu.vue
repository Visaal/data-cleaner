<template>
  <div class="action-bar-container">
    <div class="action-bar">
      <div class="action-bar-section">
        <div class="action-bar-element">
          <div class="pagination" @click="previousPage()">
            <div class="backward">❮</div>
          </div>
        </div>
        <div class="action-bar-element">
          <div class="pagination" @click="nextPage()">
            <div class="forward">❯</div>
          </div>
        </div>
      </div>

      <div class="action-bar-divider"></div>

      <div class="action-bar-section">
        <span class="action-bar-element">show</span>
        <div class="action-bar-element">
          <select
            v-model="rowsToDisplay"
            @change="setRowPerPage(rowsToDisplay)"
          >
            <option v-for="rowOption in rowOptions" :key="rowOption">{{
              rowOption
            }}</option>
          </select>
        </div>
        <span class="action-bar-element">records per page</span>
      </div>
      <div class="action-bar-divider"></div>

      <div class="action-bar-section">
        <div class="action-bar-element">
          <div class="pagination" @click="undo()">undo</div>
        </div>
      </div>
    </div>

    <div class="data-row-info">
      Showing from
      <span class="data-stat">{{ rowStartSliceIndex + 1 }}</span> to
      <span class="data-stat">{{ rowEndSliceIndex }}</span> of
      <span class="data-stat">{{ dataRowsToDisplay.length }}</span>
      <span v-if="dataRowsToDisplay.length != dataRows.length">
        rows (filtered from {{ dataRows.length }} total records)</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ContentActionMenu",
  data() {
    return {
      rowOptions: [10, 50, 100, 250, 500],
    };
  },
  created() {
    this.rowsToDisplay = this.numberOfRowsToDisplay;
  },
  methods: {
    ...mapActions([
      "setFieldNamesAction",
      "setDataAction",
      "updateDataAction",
      "setSelectedFieldsAction",
      "setNumberOfRowsToDisplayAction",
      "setStartIndexNextPageAction",
      "setStartIndexPreviousPageAction",
      "undoLastAction",
    ]),
    setRowPerPage(rowsToDisplay) {
      this.setNumberOfRowsToDisplayAction(rowsToDisplay);
    },
    nextPage() {
      this.setStartIndexNextPageAction();
    },
    previousPage() {
      this.setStartIndexPreviousPageAction();
    },
    undo() {
      this.undoLastAction();
    },
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataFileName",
      "dataSelectedFieldNames",
      "numberOfRowsToDisplay",
      "rowStartSliceIndex",
    ]),
    ...mapGetters(["rowEndSliceIndex", "dataRowsToDisplay"]),
  },
};
</script>

<style scoped>
/* ACTION BAR */
.action-bar-container {
  margin: 0px;
}

.action-bar {
  border-bottom: 2px solid var(--field-grey);
  height: 40px;
  margin-bottom: 5px;
}

.action-bar-section {
  display: inline-block;
  position: relative;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.action-bar-divider {
  display: inline-block;
  position: relative;
  height: 30px;
  border-left: 2px solid var(--field-grey);
  margin-top: 5px;
  margin-bottom: 5px;
  vertical-align: bottom; /* important to have this or other elements around it will be displaced */
  margin-left: 8px;
  margin-right: 8px;
}

.action-bar-element {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--field-label);
  margin-right: 5px;
}

div.action-bar-element {
  background-color: var(--background);
}
/* ACTION BAR */

/* DATA PAGINATION */
.pagination {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  background-color: var(--field-grey);
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bolder;
  color: var(--paragraph);
}

/* PAGINATION STYLING */
div.pagination > .forward {
  transition: 0.3s;
  font-size: 1rem;
  font-weight: bolder;
  color: var(--paragraph);
}

div.pagination > .backward {
  transition: 0.3s;
  font-size: 1rem;
  font-weight: bolder;
  color: var(--paragraph);
}

div:hover.pagination {
  background-color: var(--secondary);
  text-decoration: none;
  cursor: pointer;
}
div:hover.pagination > .forward {
  transform: translateX(3px);
  -webkit-transform: translateX(3px);
  -ms-transform: translateX(3px);
}

div:hover.pagination > .backward {
  transform: translateX(-3px);
  -webkit-transform: translateX(-3px);
  -ms-transform: translateX(-3px);
}

.data-row-info {
  font-size: 0.8rem;
  color: var(--field-label);
}

.data-stat {
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
