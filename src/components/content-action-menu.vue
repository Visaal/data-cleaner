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

      <div class="action-bar-section">
        <span class="action-bar-element">show</span>
        <div class="action-bar-element">
          <div class="selectWrapper">
            <select v-model="rowsToDisplay" @change="setRowPerPage(rowsToDisplay)">
              <option>10</option>
              <option>50</option>
              <option :value="rowsToDisplay">100</option>
              <option>250</option>
              <option>500</option>
            </select>
          </div>
        </div>
        <span class="action-bar-element">records per page</span>
      </div>
    </div>
    <div>Showing from {{ rowStartSliceIndex }} until {{ rowEndSliceIndex }}</div>
  </div>
  <!-- <h1>DATA</h1> -->
  <!-- <button @click="previousPage()">&lt;</button>
    <div class="selectWrapper">
      <select v-model="rowsToDisplay" @change="setRowPerPage(rowsToDisplay)">
        <option>10</option>
        <option>50</option>
        <option>100</option>
        <option>250</option>
        <option>500</option>
      </select>
  </div>-->
  <!-- <button @click="setRowPerPage()">LOAD MORE DATA</button> -->
  <!-- <button @click="nextPage()">&gt;</button> -->
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ContentActionMenu",
  data() {
    return {
      rowsToDisplay: this.numberOfRowsToDisplay
    };
  },
  methods: {
    ...mapActions([
      "setFieldNamesAction",
      "setDataAction",
      "updateDataAction",
      "setSelectedFieldsAction",
      "setNumberOfRowsToDisplayAction",
      "setStartIndexNextPageAction",
      "setStartIndexPreviousPageAction"
    ]),
    setRowPerPage(rowsToDisplay) {
      this.setNumberOfRowsToDisplayAction(rowsToDisplay);
    },
    nextPage() {
      this.setStartIndexNextPageAction();
    },
    previousPage() {
      this.setStartIndexPreviousPageAction();
    }
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataFileName",
      "dataSelectedFieldNames",
      "numberOfRowsToDisplay",
      "rowStartSliceIndex"
    ]),
    ...mapGetters(["rowEndSliceIndex"])
  }
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
  border-right: 2px solid var(--field-grey);
}

.action-bar.action-bar-section :not(:first-child) {
  /* margin-left: 5px; */
}

.action-bar-element {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 5px;
  background-color: var(--field-grey);
}

.action-bar-element :not(:first-child) {
  /* margin-left: 5px; */
}
span.action-bar-element {
  /* margin-left: */
  background-color: var(--background);
}
/* ACTION BAR */

/* .selectWrapper {
  border-radius: 0px;
  display: inline-block;
  overflow: hidden;
  background: var(--field-grey);
  border: 1px solid var(--field-grey);
  position: relative;
  top: 17px;
}
select {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0px;
}

button {
  height: 40px;
} */

/* DATA PAGINATION */
.pagination {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
}

/* PAGINATION STYLING */

div.pagination {
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;
}

div.pagination > .forward {
  transition: 0.3s;
}

div.pagination > .backward {
  transition: 0.3s;
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
</style>