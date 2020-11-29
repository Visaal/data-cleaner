<template>
  <div>
    <fieldset>
      <label for="fieldName">Select Field:</label>
      <select v-model="fieldName">
        <option v-for="field in dataSelectedFieldNames" :key="field">
          {{ field }}
        </option>
      </select>

      <label for="">Select Current Format</label>
      <select name="" id="" v-model="currentDateFormat">
        <option
          v-for="(tokens, format) in dateFormatTokens"
          :key="format"
          :value="tokens"
          >{{ format }} ({{ tokens }})
        </option>
      </select>

      <label for="">Select New Format</label>
      <select name="" id="" v-model="newDateFormat">
        <option
          v-for="(tokens, format) in dateFormatTokens"
          :key="format"
          :value="tokens"
          >{{ format }} ({{ tokens }})
        </option>
      </select>
      <button @click="changeFormat()">Apply</button>
    </fieldset>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DateOptions",
  data() {
    return {
      fieldName: "",
      currentDateFormat: "",
      newDateFormat: "",
      dateFormatTokens: {
        "04/03/2020": "dd/MM/yyyy",
        "04/03/20": "dd/MM/yy",
        "04-Mar-20": "dd-MMM-yy",
        "04-March-20": "dd-MMMM-yy",
        "4/03/2020": "d/MM/yyyy",
        "4/03/20": "d/MM/yy",
        "4-Mar-20": "d-MMM-yy",
        "4-March-20": "d-MMMM-yy",
        "3/4/2020": "M/d/yyyy",
        "Mar-20": "MMM-yy",
        "Mar 03 2020": "MMM dd yyyy",
        "Wednesday, 14 March 2020": "EEEE, dd MMMM yyyy",
        "4.3.20": "d/M/yy",
        "2020-03-04": "yyyy-MM-dd",
        "14/02/2020 09:12:10 PM": "dd/MM/yyyy tt",
        "14/02/2020 17:32:10": "dd/MM/yyyy TT",
        "14/02/2020 09:32 PM": "dd/MM/yyyy t",
        "14/02/2020 17:32": "dd/MM/yyyy T",
        "02/14/2020 09:12:10 PM": "MM/dd/yyyy tt",
        "02/14/2020 17:32:10": "MM/dd/yyyy TT",
        "02/14/2020 09:32 PM": "MM/dd/yyyy t",
        "02/14/2020 17:32": "MM/dd/yyyy T",
      },
    };
  },
  methods: {
    ...mapActions(["changeDateFormatAction"]),
    changeFormat() {
      this.changeDateFormatAction({
        fieldName: this.fieldName,
        currentDateFormat: this.currentDateFormat,
        newDateFormat: this.newDateFormat,
      });
    },
  },
  computed: {
    ...mapState(["dataSelectedFieldNames"]),
  },
};
</script>

<style></style>
