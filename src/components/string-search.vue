<template>
  <div>
    <fieldset>
      <label for="fieldToSearch">Select Field:</label>
      <select v-model="fieldToSearch">
        <option v-for="field in dataSelectedFieldNames" :key="field.id">
          {{
          field
          }}
        </option>
      </select>

      <label for="stringsToFind">Text to Search For:</label>
      <!-- <input type="text" v-model="stringsToFind" /> -->
      <InputChipContainer v-on:input-values="setSearchStrings" />

      <label for="newField">New Field Name:</label>
      <input type="text" v-model="newField" />

      <div>
        <button v-on:click="applyRule">Apply</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import InputChipContainer from "@/components/input-chip.vue";

export default {
  name: "StringSearch",
  data() {
    return {
      newField: "",
      stringsToFind: [],
      fieldToSearch: ""
    };
  },
  components: {
    InputChipContainer
  },
  created() {},
  methods: {
    ...mapActions(["extractStringsAction"]),
    setSearchStrings(chips) {
      this.stringsToFind = chips;
    },
    applyRule() {
      this.extractStringsAction({
        newField: this.newField,
        stringsToFind: this.stringsToFind,
        fieldToSearch: this.fieldToSearch
      });
    }
  },
  watch: {
    fieldToSearch: function(fieldValue) {
      let selectedField = document.getElementById(fieldValue);
      selectedField.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center"
      });
    }
  },
  computed: {
    ...mapState(["dataRows", "dataFieldNames", "dataSelectedFieldNames"])
  }
};
</script>

<style></style>
