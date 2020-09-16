<template>
  <div>
    <fieldset>
      <div>
        <label for="newField">New Field Name:</label>
        <input type="text" v-model="newField" />
      </div>

      <label for="">Fields to Join:</label>
      <div class="filter-box-search">
        <input type="text" placeholder="search" v-model="search" />
      </div>

      <div class="filter-value-list shown">
        <div v-for="field in filteredList" :key="field">
          <label class="custom-checkbox">
            {{ field }}
            <input
              type="checkbox"
              :name="field"
              :value="field"
              v-model="selectedValues"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>

      <div class="border-above" v-if="selectedValues.length">
        <label for="">Change Order:</label>
        <draggable v-model="selectedValues" @start="drag = true">
          <div
            v-for="selectedField in selectedValues"
            :key="selectedField"
            class="field-item"
          >
            <div class="">{{ selectedField }}</div>
          </div>
        </draggable>
      </div>

      <div class="border-above">
        <label for="">Select Separator:</label>
        <select v-model="separator">
          <option value="">"" - None </option>
          <option value=" ">" " - Space </option>
          <option value="_">"_" - Underscore</option>
          <option value=".">"." - Decimal Place</option>
          <option value=",">"," - Comma</option>
          <option value=":">":" - Colon</option>
          <option value="-">"-" - Hyphen</option>
          <option value="|">"|" - Pipe</option>
          <option value="custom">Custom</option>
        </select>

        <div v-if="separator === 'custom'">
          <input
            type="text"
            v-model="custom_separator"
            placeholder="enter delimiter"
          />
        </div>
      </div>
      <button v-on:click="createMergedField" type="button">Apply</button>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";

export default {
  name: "JoinFields",
  components: {
    draggable,
  },
  data() {
    return {
      newField: "",
      search: "",
      selectedValues: [],
      separator: "",
      custom_separator: "",
    };
  },
  methods: {
    ...mapActions(["mergeFieldsAction"]),
    createMergedField() {
      this.mergeFieldsAction({
        newField: this.newField,
        fieldsToJoin: this.selectedValues,
        delimiter: this.delimiter,
      });
    },
  },
  computed: {
    ...mapState(["dataSelectedFieldNames"]),
    filteredList() {
      return this.dataSelectedFieldNames.filter((value) => {
        return value.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    delimiter() {
      let delimiter;
      if (this.separator === "custom") {
        delimiter = this.custom_separator;
      } else {
        delimiter = this.separator;
      }
      return delimiter;
    },
    exampleValue() {
      return this.selectedValues.join(this.delimiter);
    },
  },
};
</script>

<style>
.custom-checkbox {
  width: unset;
}

.filter-value-list.shown {
  max-height: 20vh;
  animation: unset;
}

.border-above {
  border-top: 2px;
  border-top-style: solid;
  border-color: var(--field-grey);
  padding-top: 10px;
  padding-bottom: 10px;
}

.example-text {
  font-size: 0.8rem;
  color: var(--field-label);
}
</style>
