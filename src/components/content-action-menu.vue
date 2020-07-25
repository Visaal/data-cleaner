<template>
  <div>
    <div class="action-top">
      <button class="action-bar-button first" @click="previousPage()">
        <div class="backward">❮</div>
      </button>

      <button class="action-bar-button" @click="nextPage()">
        <div class="forward">❯</div>
      </button>

      <div class="action-bar-divider"></div>

      <span>show </span>
      <select
        class="action-bar-option"
        v-model="rowsToDisplay"
        @change="setRowPerPage(rowsToDisplay)"
      >
        <option v-for="rowOption in rowOptions" :key="rowOption">{{
          rowOption
        }}</option>
      </select>
      <span> records per page</span>

      <div class="action-bar-divider"></div>

      <button class="action-bar-button" @click="undo()">
        <div class="undo">↺</div>
        undo
      </button>
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
.action-top {
  width: 100%;
  height: 3.6rem;
  border-bottom: 2px solid var(--field-grey);
  margin-bottom: 4px;
}

.action-top span {
  font-size: 0.8rem;
  color: var(--field-label);
}
.action-bar-divider {
  display: inline-block;
  position: relative;
  height: 30px;
  border-left: 2px solid var(--field-grey);
  margin-top: 10px;
  margin-bottom: 10px;
  vertical-align: bottom; /* important to have this or other elements around it will be displaced */
  margin-left: 8px;
  margin-right: 8px;
}

.data-row-info {
  font-size: 0.8rem;
  color: var(--field-label);
}

.action-bar-option {
  width: 50px;
  vertical-align: 0%;
}

.action-bar-button {
  margin-top: 10px;
  margin-bottom: 10px;
  /* height: 30px; */
  /* line-height: 30px; */
  background-color: var(--field-grey);
  border-color: var(--field-grey);
  color: var(--button-text);
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  padding: 0.55rem 0.55rem;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  z-index: 1;
}

.action-bar-button:hover {
  filter: brightness(93%);
}

.action-bar-button.first {
  margin-right: 0.5rem;
}

/* UNDO BUTTON */
.action-bar-button > .undo {
  margin-right: 3px;
  transition: 0.3s;
  font-weight: 900;
  overflow: hidden;
}
.action-bar-button:hover > .undo {
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
}

.action-bar-button > .backward {
  transition: 0.3s;
}
.action-bar-button:hover > .backward {
  transform: translateX(-3px);
  -webkit-transform: translateX(-3px);
  -ms-transform: translateX(-3px);
}

.action-bar-button > .forward {
  transition: 0.3s;
}
.action-bar-button:hover > .forward {
  transform: translateX(3px);
  -webkit-transform: translateX(3px);
  -ms-transform: translateX(3px);
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
