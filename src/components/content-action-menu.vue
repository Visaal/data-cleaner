<template>
  <div>
    <div class="action-top">
      <button class="action-bar-button first" @click="previousPage()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
            fill="#000"
          />
        </svg>
      </button>

      <button class="action-bar-button" @click="nextPage()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
            fill="#000"
          />
        </svg>
      </button>

      <div class="action-bar-divider"></div>

      <div class="records-to-display">
        <span>show </span>
        <select
          class="record-options"
          v-model="rowsToDisplay"
          @change="setRowPerPage(rowsToDisplay)"
        >
          <option v-for="rowOption in rowOptions" :key="rowOption">{{
            rowOption
          }}</option>
        </select>
        <span> records per page</span>
      </div>

      <div class="action-bar-divider"></div>

      <button class="action-bar-button" @click="undo()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"
          />
        </svg>
      </button>

      <div class="action-bar-divider"></div>

      <!-- MANAGE FIELDS - CHANGE ORDER AND REMOVE -->
      <button
        ref="sortButton"
        class="action-bar-button"
        @click="
          showSortField = true;
          calculatePosition();
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M4 8h16V5H4v3zm10 11v-9h-4v9h4zm2 0h4v-9h-4v9zm-8 0v-9H4v9h4zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
            fill="#000"
          />
        </svg>
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
              <!-- DISPLAYING FIELD -->
              <div v-if="editingName !== field">
                <div class="column-name">{{ fieldNameToDisplay(field) }}</div>
                <div class="edit-column" @click="editFieldName(field)">
                  &#9999;
                </div>
                <div
                  class="remove-column"
                  @click="selectFieldForRemoval(field)"
                >
                  &#x2716;
                </div>
              </div>

              <!-- EDITING FIELD NAME -->
              <div>
                <div v-if="editingName === field">
                  <input
                    ref="editedField"
                    class="edit-field-name"
                    type="text"
                    :placeholder="fieldNameToDisplay(field)"
                    @keyup.enter="setNewName(field)"
                  />
                  <div class="apply-change" @click="setNewName(field)">
                    &#x2716;
                  </div>
                  <div class="cancel-change" @click="cancelNameChange(field)">
                    &#8634;
                  </div>
                </div>
              </div>
            </div>
          </draggable>
        </div>

        <div class="filter-list-actions">
          <button @click="updateFieldChanges">
            Apply
          </button>
          <button class="secondary" @click="cancelFieldChanges">
            Cancel
          </button>
        </div>
      </fieldset>

      <div class="action-bar-divider"></div>

      <!-- ACTIVE FILTERS -->
      <button
        id="filter-icon"
        ref="activeFiltersButton"
        class="action-bar-button"
        @click="
          showActiveFilters = true;
          calculateFilterBoxPosition();
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M14 14v6l-4 2v-8L4 5V3h16v2l-6 9zM6.404 5L12 13.394 17.596 5H6.404z"
            fill="#000"
          />
        </svg>
      </button>

      <fieldset
        v-if="showActiveFilters"
        class="active-filters"
        ref="activeFileterBox"
        :style="positionStyle"
      >
        <div class="filter-box-search">
          <h3>Active Filters</h3>
        </div>

        <div class="filter-value-list expanded">
          <div v-if="Object.keys(activeFilterValues).length">
            <div
              v-for="(filterValues, filterField) in selectedFilters"
              :key="filterField.index"
            >
              <div
                v-for="filterValue in filterValues"
                :key="filterValue.index"
                class="active-filter-row"
              >
                <div class="filter-detail">
                  <div class="filter-field-name">{{ filterField }}:</div>
                  <div class="filter-field-value">{{ filterValue }}</div>
                </div>

                <div
                  class="remove-filter"
                  @click="removeFilterItems(filterField, filterValue)"
                >
                  &#x2716;
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            No current filters in place
          </div>
        </div>

        <div class="filter-list-actions">
          <button @click="removeActiveFilters()">Apply</button>
          <button class="secondary" @click="cancelRemoveFilter()">
            Cancel
          </button>
        </div>
      </fieldset>

      <div class="action-bar-divider"></div>

      <button class="action-bar-button" @click="downloadData()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z"
            fill="#000"
          />
        </svg>
      </button>

      <div class="action-bar-divider"></div>

      <DeleteRows />
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
import { cloneDeep } from "lodash";
import Papa from "papaparse";
import DeleteRows from "@/components/delete-rows.vue";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default {
  name: "ContentActionMenu",
  components: {
    draggable,
    DeleteRows,
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
      selectedFilters: {},
      editingName: "",
      // newFieldName: {},
      nameMap: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initToolTips();
    });
  },
  created() {
    this.rowsToDisplay = this.numberOfRowsToDisplay;
    this.fieldList = [...this.dataSelectedFieldNames];
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
      "updateActiveFilterAction",
      "changeFieldNamesAction",
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
    calculateFilterBoxPosition() {
      this.selectedFilters = cloneDeep(this.activeFilterValues);
      this.$nextTick(() => {
        if (this.showActiveFilters) {
          let leftAdjustment = this.$refs.activeFileterBox.clientWidth;
          let rightPosition = this.$refs.activeFiltersButton.getBoundingClientRect()
            .right;
          let topPosition = this.$refs.activeFiltersButton.getBoundingClientRect()
            .bottom;
          this.positionStyle.left = `${rightPosition - leftAdjustment}px`;
          this.positionStyle.top = `${topPosition}px`;
        }
      });
    },
    selectFieldForRemoval(field) {
      let index = this.fieldList.indexOf(field);
      if (index > -1) {
        this.fieldList.splice(index, 1);
      }
    },
    fieldNameToDisplay(field) {
      if (this.nameMap[field]) {
        return this.nameMap[field];
      }
      return field;
    },
    editFieldName(field) {
      this.editingName = field;
    },
    setNewName(field) {
      if (this.$refs.editedField[0].value.length > 0) {
        this.nameMap[field] = this.$refs.editedField[0].value;
      }
      this.editingName = "";
    },
    cancelNameChange(field) {
      delete this.nameMap[field];
      this.editingName = "";
    },
    updateFieldChanges() {
      // !! IMPORTANT !!
      // Change order of the fields before trying to change their names
      // As the field list will contain reference to the old field name

      // Change field order
      this.setSelectedFieldsAction(this.fieldList);
      // Rename fields
      if (
        Object.keys(this.nameMap).length !== 0 &&
        this.nameMap.constructor === Object
      ) {
        this.changeFieldNamesAction(this.nameMap);
      }

      this.showSortField = !this.showSortField;
    },
    cancelFieldChanges() {
      this.fieldList = [...this.dataSelectedFieldNames];
      this.nameMap = {};
      this.showSortField = !this.showSortField;
    },
    removeFilterItems(filterField, filterValue) {
      let fieldValues = this.selectedFilters[filterField];
      let index = fieldValues.indexOf(filterValue);

      if (index > -1) {
        fieldValues.splice(index, 1);
      }
      // If no filters values left for a field remove the field key from object
      // This upddates the visual filter icon
      if (!fieldValues.length) {
        delete this.selectedFilters[filterField];
      }
    },
    removeActiveFilters() {
      this.updateActiveFilterAction(this.selectedFilters);
      this.showActiveFilters = !this.showActiveFilters;
    },
    cancelRemoveFilter() {
      this.selectedFilters = cloneDeep(this.activeFilterValues);
      this.showActiveFilters = !this.showActiveFilters;
    },
    downloadData() {
      let csv = Papa.unparse(this.dataRows, {
        columns: this.dataSelectedFieldNames,
      });
      let csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      let csvURL = window.URL.createObjectURL(csvData);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      let fileName = `CLEANED_${this.dataFileName}`;
      tempLink.setAttribute("download", fileName);
      tempLink.click();
    },
    initToolTips() {
      tippy("#filter-icon", {
        content: "filter",
        theme: "tomato",
      });
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

<style>
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
  height: 24px;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border-left: 2px solid var(--field-grey);
  margin-top: 10px;
  margin-bottom: 10px;
  vertical-align: bottom; /* important to have this or other elements around it will be displaced */
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}

.data-row-info {
  font-size: 0.8rem;
  color: var(--field-label);
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
  padding: 0.3rem 0.3rem;
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

.data-row-info {
  font-size: 0.8rem;
  color: var(--field-label);
}

.data-stat {
  font-size: 0.8rem;
  font-weight: bold;
}

.sort-fields {
  z-index: 1;
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
  vertical-align: middle;
}

.column-name {
  display: inline-block;
  width: 80%;
  vertical-align: middle;
}

.remove-column {
  display: inline-block;
  width: 10%;
  vertical-align: middle;
  text-align: right;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--field-label);
}

.edit-column {
  display: inline-block;
  width: 10%;
  vertical-align: middle;
  text-align: right;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--field-label);
  transform: rotate(135deg);
}

.edit-field-name {
  width: 80%;
  margin-bottom: 0px;
}

.apply-change {
  display: inline-block;
  width: 10%;
  vertical-align: middle;
  text-align: right;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--field-label);
  transform: rotate(45deg);
}

.cancel-change {
  display: inline-block;
  width: 10%;
  vertical-align: middle;
  text-align: right;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--field-label);
}

.filter-box-search > h3 {
  color: var(--stroke);
  margin-top: 0.5rem;
  margin-bottom: 0rem;
}

.active-filters {
  z-index: 1;
  min-width: 40%;
  max-width: 40%;
  max-height: 70%;
  position: absolute;
  background: var(--background);
  -webkit-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  overflow: auto;
  width: auto;
  box-sizing: border-box;
}

.active-filter-row {
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
  box-sizing: border-box;
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

.records-to-display {
  display: inline-block;
  vertical-align: 50%;
}

input[type="select"] + .records-to-display {
  margin-bottom: 0px;
}

.records-to-display > span {
}

.record-options {
  width: 65px;
  height: auto;
  margin-bottom: 0px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  vertical-align: middle;
}

.tippy-box[data-theme~="tomato"] {
  background-color: tomato;
  color: yellow;
}
.tippy-box[data-theme~="tomato"][data-placement^="top"] > .tippy-arrow::before {
  border-top-color: tomato;
}
.tippy-box[data-theme~="tomato"][data-placement^="bottom"]
  > .tippy-arrow::before {
  border-bottom-color: tomato;
}
.tippy-box[data-theme~="tomato"][data-placement^="left"]
  > .tippy-arrow::before {
  border-left-color: tomato;
}
.tippy-box[data-theme~="tomato"][data-placement^="right"]
  > .tippy-arrow::before {
  border-right-color: tomato;
}
</style>
