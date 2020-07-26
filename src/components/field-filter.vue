<template>
  <div class="filter">
    <div @click="filterData(field)">
      <svg
        :class="{ 'active-filter': selectedValues.length }"
        class="filter-icon"
        fill="none"
        height="24"
        stroke="#546778"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    </div>
    <fieldset
      v-if="filterOption"
      class="filter-options"
      :style="positionStyle"
      ref="filterBox"
    >
      <div class="filter-box-search">
        <input type="text" placeholder="search" v-model="search" />
      </div>

      <div class="filter-value-list" :class="{ expanded: filterOption }">
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
        <button @click="clearFilter(field)" class="secondary">Clear</button>
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
      let distinctValues = [
        ...Object.keys(this.dataSchema[field]["distinctValues"]["date"]),
        ...Object.keys(this.dataSchema[field]["distinctValues"]["number"]),
        ...Object.keys(this.dataSchema[field]["distinctValues"]["text"]),
      ];
      this.distinctValuesForField = distinctValues;
      this.filterOption = true;
      let buffer = 15;
      this.positionStyle.left = `${event.pageX}px`;
      this.positionStyle.top = `${event.pageY + buffer}px`;
      this.$nextTick(() => {
        if (
          event.pageX + this.$refs.filterBox.clientWidth >
          window.innerWidth
        ) {
          let leftAdjustment =
            event.pageX -
            (event.pageX +
              this.$refs.filterBox.clientWidth -
              window.innerWidth +
              buffer);
          this.positionStyle.left = `${leftAdjustment}px`;
        }
      });
    },
    setFilter(field) {
      this.filterOption = false;
      this.filterDataAction({
        selectedField: field,
        fieldValuesSelected: this.selectedValues,
      });
    },
    clearFilter(field) {
      this.filterOption = false;
      this.selectedValues = [];
      this.filterDataAction({
        selectedField: field,
        fieldValuesSelected: this.selectedValues,
      });
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
  stroke: var(--field-label);
  height: 15px;
  width: 15px;
  transition: 0.5s;
  fill: transparent;
  cursor: pointer;
}

.active-filter {
  fill: var(--field-label);
}

.filter-options {
  position: absolute;
  background: var(--background);
  -webkit-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
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
  max-height: 0vh;
  overflow-y: auto;
}

.expanded.filter-value-list {
  overflow-y: auto;
  animation: undefined-easeOutElastic 0.9s none;
  max-height: 50vh;
}

@keyframes undefined-easeOutElastic {
  0% {
    /* transform: translateY(0%); */
    max-height: 0vh;
  }
  100% {
    /* transform: translateY(100%); */
    max-height: 50vh;
  }
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
