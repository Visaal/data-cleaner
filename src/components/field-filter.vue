<template>
  <div class="filter">
    <div @click="filterData(field)">
      <img class="filter-icon" alt=">>>" src="../assets/filter_icon.png" />
    </div>
    <fieldset v-if="filterOption" class="filter-options" :style="positionStyle">
      <input type="text" :placeholder="field" />
      <div v-for="value in distinctValuesForField" :key="value">
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
      <div>
        <button @click="setFilter(field)">Select</button>
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
  },
  computed: {
    ...mapState(["dataSchema"]),
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
  /* top: 170px;
  left: 300px; */
  background: var(--background);
  -webkit-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  max-height: 50vh;
  overflow: auto;
  width: auto;
}
</style>
