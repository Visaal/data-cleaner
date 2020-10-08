<template>
  <div>
    <fieldset>
      <label for="fieldName">Select Field:</label>
      <select v-model="fieldName">
        <option v-for="field in dataSelectedFieldNames" :key="field">
          {{ field }}
        </option>
      </select>

      <div>
        <label for="newField" v-if="existingMap">Existing Lookup Name:</label>
        <label for="newField" v-else>New Field Name:</label>
        <input type="text" v-model="newField" :disabled="existingMap" />
      </div>

      <div v-if="fieldName">
        <label for="">Enter Lookup Values:</label>
        <div v-for="(value, index) in orderedValues" :key="index">
          <div class="lookup-pair">
            <div class="raw-value">{{ value[0] }}</div>
            <input
              class="lookup-value"
              type="text"
              v-model="valueMap[value[0]]"
            />
          </div>
        </div>
        <button v-on:click="createLookup" type="button">Apply</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      fieldName: "",
      newField: "",
      valueMap: {},
      existingMap: false,
    };
  },
  methods: {
    ...mapActions(["createLookupAction"]),
    createLookup() {
      this.createLookupAction({
        baseField: this.fieldName,
        newField: this.newField,
        valueMap: this.valueMap,
      });
    },
  },
  watch: {
    fieldName: function(fieldValue) {
      // load existing lookup maps
      // TODO: ALLOW FOR MULTIPLE LOOKUPS ON A SINGLE FIELD
      if (this.lookupMaps[fieldValue]) {
        this.existingMap = true;
        this.newField = Object.keys(this.lookupMaps[fieldValue][0])[0];
        this.valueMap = this.lookupMaps[fieldValue][0][this.newField];
      } else {
        // create blank value map based on distinct values
        this.existingMap = false;
        this.newField = "";
        this.valueMap = {};
        for (let i = 0; i < this.orderedValues.length; i++) {
          this.valueMap[this.orderedValues[i][0]] = "";
        }
      }
      // scroll to field selected
      let selectedField = document.getElementById(fieldValue);
      selectedField.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center",
      });
    },
  },
  computed: {
    ...mapState(["dataSelectedFieldNames", "dataSchema", "lookupMaps"]),
    orderedValues: function() {
      let allDistinctValues = {};
      for (const [key] of Object.entries(
        this.dataSchema[this.fieldName]["distinctValues"]
      )) {
        Object.assign(
          allDistinctValues,
          this.dataSchema[this.fieldName]["distinctValues"][key]
        );
      }
      let entries = Object.entries(allDistinctValues);
      let sorted = entries.sort((a, b) => b[1].length - a[1].length);
      return sorted;
    },
  },
};
</script>

<style>
.lookup-pair {
  width: 100%;
  height: 100%;
  display: table;
  /* border-top: 1px solid var(--field-grey); */
  border-bottom: 1px solid var(--table-border);
}

.raw-value {
  display: inline-block;
  width: 50%;
  font-size: 0.8rem;
  display: table-cell;
  vertical-align: middle;
  word-break: break-all;
}

input[type="text"].lookup-value {
  width: 100%;
  margin-bottom: 0px;
  display: table-cell;
  vertical-align: middle;
  border-radius: 0;
}
</style>
