<template>
  <div>
    <fieldset>
      <label for="fieldName">Select Field:</label>
      <select v-model="fieldName">
        <option v-for="field in textFields" :key="field.id">
          {{
          field
          }}
        </option>
      </select>
      <button v-on:click="capitaliseValues" type="button">Apply</button>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Capitalise",
  data() {
    return {
      fieldName: ""
    };
  },
  created() {},
  methods: {
    // use helper function from vuex to get the actions defined
    ...mapActions(["capitaliseValuesAction"]),
    capitaliseValues() {
      this.capitaliseValuesAction(this.fieldName);
    }
  },
  watch: {
    fieldName: function(fieldValue) {
      let selectedField = document.getElementById(fieldValue);
      selectedField.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center"
      });
    }
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataSelectedFieldNames",
      "dataSchema"
    ]),
    textFields: function() {
      return this.dataSelectedFieldNames.filter(
        field => this.dataSchema[field]["likelyDataType"] === "text"
      );
    }
  }
};
</script>

<style></style>
