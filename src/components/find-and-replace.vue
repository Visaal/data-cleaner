<template>
  <fieldset>
    <label for="fieldName">Select Field:</label>
    <select v-model="fieldName">
      <option v-for="field in dataSelectedFieldNames" :key="field">
        {{ field }}
      </option>
    </select>

    <div>
      <label>Find:</label>
      <input type="text" v-model="searchValue" />
    </div>

    <div>
      <label>Replace:</label>
      <input type="text" v-model="replaceValue" />
    </div>

    <div>
      <label class="custom-checkbox">
        Case Sensitive
        <input type="checkbox" v-model="caseSensitive" />
        <span class="checkmark"></span>
      </label>
    </div>

    <button v-on:click="findAndReplace" type="button">Apply</button>
  </fieldset>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "FindReplace",
  data() {
    return {
      fieldName: "",
      searchValue: "",
      replaceValue: "",
      caseSensitive: true,
    };
  },
  methods: {
    ...mapActions(["findAndReplaceAction"]),
    findAndReplace() {
      this.findAndReplaceAction({
        fieldName: this.fieldName,
        searchValue: this.searchValue,
        replaceValue: this.replaceValue,
        caseSensitive: this.caseSensitive,
      });
    },
  },
  computed: {
    ...mapState(["dataSelectedFieldNames", "dataSchema", "lookupMaps"]),
  },
};
</script>

<style></style>
