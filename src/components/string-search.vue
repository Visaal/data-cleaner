<template>
  <div>
    <fieldset>
      <label for="newField">New Field Name:</label>
      <input type="text" v-model="newField" />

      <label for="stringsToFind">Text to Search For:</label>
      <input type="text" v-model="stringsToFind" />

      <label for="fieldToSearch">Select Field:</label>
      <select v-model="fieldToSearch">
        <option v-for="field in dataSelectedFieldNames" :key="field.id">
          {{
          field
          }}
        </option>
      </select>

      <div class="form-actions">
        <button v-on:click="applyRule">Apply</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "StringSearch",
  data() {
    return {
      newField: "",
      stringsToFind: "",
      fieldToSearch: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["extractStringsAction"]),
    applyRule() {
      this.extractStringsAction({
        newField: this.newField,
        stringsToFind: this.stringsToFind,
        fieldToSearch: this.fieldToSearch
      });
    }
  },
  computed: {
    ...mapState(["dataRows", "dataFieldNames", "dataSelectedFieldNames"])
  }
};
</script>

<style></style>
