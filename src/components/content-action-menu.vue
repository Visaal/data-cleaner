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

      <!-- MANAGE FIELDS - CHANGE ORDER AND REMOVE -->
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
        ref="activeFiltersButton"
        class="action-bar-button"
        @click="
          showActiveFilters = true;
          calculateFilterBoxPosition();
        "
      >
        <strong>FILTERS</strong>
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
        <strong>DL</strong>
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

      // Change field order and selected fields
      this.setSelectedFieldsAction(this.fieldList);
      // Rename fields
      if (
        Object.keys(this.nameMap).length !== 0 &&
        this.nameMap.constructor === Object
      ) {
        this.changeFieldNamesAction(this.nameMap);
      }

      // set fieldlist back to the state value to prevent subsequent...
      // ...field deletions happening straight away
      this.fieldList = [...this.dataSelectedFieldNames];
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
</style>
