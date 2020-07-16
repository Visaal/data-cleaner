<template>
  <div class="filter">
    <div @click="filterData(field)">
      <img class="filter-icon" alt=">>>" src="../assets/filter_icon.png" />
    </div>
    <fieldset v-if="filterOption" class="filter-options" :style="positionStyle">
      <div class="filter-box-search">
        <input type="text" placeholder="search" v-model="search" />
      </div>

      <div class="filter-value-list">
        <div v-for="value in filteredList" :key="value">
          <label class="custom-checkbox">
            {{ value }}
            <input
              type="checkbox"
              :name="value"
              :value="value"
              v-model="selectedValues"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <div class="filter-list-actions">
        <button @click="setFilter(field)">Apply</button>
        <button @click="clearFilter()" class="secondary">Clear</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "FieldFilter",
  props: {
    field: String,
  },
  data() {
    return {
      filterOption: false,
      distinctValuesForField: [],
      selectedValues: [],
      search: "",
      positionStyle: {
        top: "0px",
        left: "0px",
      },
    };
  },
  methods: {
    ...mapActions(["filterDataAction"]),
    filterData(field) {
      this.positionStyle.left = `${event.pageX}px`;
      this.positionStyle.top = `${event.pageY}px`;

      let distinctValues = [
        ...Object.keys(this.dataSchema[field]["distinctValues"]["date"]),
        ...Object.keys(this.dataSchema[field]["distinctValues"]["number"]),
        ...Object.keys(this.dataSchema[field]["distinctValues"]["text"]),
      ];
      this.distinctValuesForField = distinctValues;
      this.filterOption = true;
    },
    setFilter(field) {
      this.filterOption = false;
      this.filterDataAction({
        selectedField: field,
        filterValues: this.selectedValues,
      });
    },
    clearFilter() {
      this.filterOption = false;
    },
  },
  computed: {
    ...mapState(["dataSchema"]),
    filteredList() {
      return this.distinctValuesForField.filter((value) => {
        return value.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style>
.filter {
  display: inline-block;
}

.filter-icon {
  width: 8px;
  height: 8px;
  cursor: pointer;
}

.filter-options {
  position: absolute;
  background: var(--background);
  -webkit-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  max-height: 50vh;
  overflow: auto;
  width: auto;
}

/* FILTER BOX */

.filter-box-search {
  padding-bottom: 10px;
  border-bottom: 2px;
  border-bottom-style: solid;
  border-color: var(--field-grey);
}

.filter-value-list {
  margin-top: 10px;
  margin-bottom: 10px;
  max-height: 20vh;
  overflow-y: auto;
}

.filter-list-actions {
  border-top: 2px;
  border-top-style: solid;
  border-color: var(--field-grey);
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-list-actions button:first-child {
  margin-right: 4%;
}

.filter-list-actions button {
  width: 48%;
}
</style>
