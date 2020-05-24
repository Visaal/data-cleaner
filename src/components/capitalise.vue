<template>
  <div>
    <fieldset>
      <label for="fieldName">Select Field:</label>
      <select v-model="fieldName">
        <option v-for="field in dataFieldNames" :key="field.id">
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
  computed: {
    ...mapState(["dataRows", "dataFieldNames"]) // can be used as variable and state are both named 'rows'
  }
};
</script>

<style></style>
