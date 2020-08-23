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

      <div class="action-bar-divider"></div>

      <button
        ref="sortButton"
        class="action-bar-button"
        @click="
          showSortField = true;
          calculatePosition();
        "
      >
        <strong>SORT</strong>
      </button>

      <fieldset
        v-if="showSortField"
        class="sort-fields"
        :style="positionStyle"
        ref="sortFieldBox"
      >
        <div class="filter-box-search">
          <h3>Set Field Order</h3>
        </div>

        <div class="filter-value-list expanded">
          <draggable v-model="fieldList" @start="drag = true">
            <div v-for="field in fieldList" :key="field.id" class="field-item">
              {{ field }}
            </div>
          </draggable>
        </div>

        <div class="filter-list-actions">
          <button @click="updateFieldOrder">
            Apply
          </button>
          <button class="secondary" @click="cancelFieldOrderChange">
            Cancel
          </button>
        </div>
      </fieldset>

      <div class="action-bar-divider"></div>

      <!-- ACTIVE FILTERS -->

      <!-- TODO: FIELD POSITION, REMOVE FILTERS, UPDATE FILTERED ROWS -->

      <button
        ref="activeFilters"
        class="action-bar-button"
        @click="showActiveFilters = !showActiveFilters"
      >
        <strong>FILTERS</strong>
      </button>

      <fieldset
        v-if="showActiveFilters"
        class="active-filters"
        ref="activeFileterBox"
      >
        <div class="filter-box-search">
          <h3>Active Filters</h3>
        </div>

        <div class="filter-value-list expanded">
          <div
            v-for="(filterValues, filterField) in activeFilterValues"
            :key="filterField.index"
          >
            <div
              v-for="filterValue in filterValues"
              :key="filterValue.index"
              class="active-filter"
            >
              <div class="filter-detail">
                <div class="filter-field-name">{{ filterField }}:</div>
                <div class="filter-field-value">{{ filterValue }}</div>
              </div>

              <div class="remove-filter">&#x2716;</div>
            </div>
          </div>
        </div>

        <div class="filter-list-actions">
          <button>Apply</button>
          <button class="secondary">Cancel</button>
        </div>
      </fieldset>
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
import draggable from "vuedraggable";

export default {
  name: "ContentActionMenu",
  components: {
    draggable,
  },
  data() {
    return {
      rowOptions: [10, 50, 100, 250, 500],
      showSortField: false,
      fieldList: [],
      positionStyle: {
        top: "0px",
        left: "0px",
      },
      showActiveFilters: false,
    };
  },
  created() {
    this.rowsToDisplay = this.numberOfRowsToDisplay;
    this.fieldList = this.dataSelectedFieldNames;
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
    calculatePosition() {
      this.$nextTick(() => {
        if (this.showSortField) {
          let leftAdjustment = this.$refs.sortFieldBox.clientWidth;
          let rightPosition = this.$refs.sortButton.getBoundingClientRect()
            .right;
          let topPosition = this.$refs.sortButton.getBoundingClientRect()
            .bottom;
          this.positionStyle.left = `${rightPosition - leftAdjustment}px`;
          this.positionStyle.top = `${topPosition}px`;
        }
      });
    },
    updateFieldOrder() {
      this.setSelectedFieldsAction(this.fieldList);
      this.showSortField = !this.showSortField;
    },
    cancelFieldOrderChange() {
      this.fieldList = this.dataSelectedFieldNames;
      this.showSortField = !this.showSortField;
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
      "activeFilterValues",
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

.sort-fields {
  max-width: 30%;
  max-height: 70%;
  position: absolute;
  background: var(--background);
  -webkit-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  overflow: auto;
  width: auto;
}

.field-item {
  cursor: move;
  font-size: 0.8rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px;
  border-style: solid;
  border-color: var(--field-grey);
  margin-bottom: 0.2rem;
  border-left: 10px;
  border-left-style: solid;
  border-left-color: var(--field-grey);
}

.filter-box-search > h3 {
  color: var(--stroke);
  margin-top: 0.5rem;
  margin-bottom: 0rem;
}

.active-filters {
  max-width: 40%;
  max-height: 70%;
  position: absolute;
  background: var(--background);
  -webkit-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  overflow: auto;
  width: auto;
}

.active-filter {
  font-size: 0.8rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px;
  border-style: solid;
  border-color: var(--field-grey);
  margin-bottom: 0.2rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  height: 100%;
}

.filter-detail {
  display: inline-block;
  width: 95%;
}

.filter-field-name {
  font-weight: bold;
}

.filter-field-value {
}

.remove-filter {
  display: inline-block;
  cursor: pointer;
  font-size: 1.5rem;
  height: 100%;
  vertical-align: top;
  color: var(--field-label);
}
</style>
