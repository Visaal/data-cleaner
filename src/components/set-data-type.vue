<template>
  <div>
    <fieldset>
      <label for="fieldName">Select Field:</label>
      <select v-model="fieldName">
        <option v-for="field in dataSelectedFieldNames" :key="field.id">
          {{
          field
          }}
        </option>
      </select>

      <label for="dataTypeName">Select Data Type:</label>
      <select v-model="dataTypeName">
        <option v-for="dataType in availableDataTypes" :key="dataType.id">
          {{
          dataType
          }}
        </option>
      </select>

      <div v-if="dataTypeName === 'Number'">
        <label>Set Non-Numeric Values to:</label>
        <label class="custom-radio" name="radio">
          <input type="radio" name="radio" v-model="selectedOption" />
          <label for="radio">null</label>
          <span class="radiomark" name="radio" v-on:click="setToNull"></span>
        </label>
        <label class="custom-radio" name="radio">
          <input type="radio" name="radio" />
          <span class="radiomark" name="radio" v-on:click="setDefaultNumber"></span>
          <input type="number" name="radio" v-model="selectedOption" />
        </label>
        <div
          v-for="(value, key) in dataSchema[fieldName]['valueCounts']['text']"
          :key="key"
        >{{key}}: {{value}}</div>
      </div>

      <button v-on:click="setDataType" type="button">Apply</button>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SetDataType",
  data() {
    return {
      fieldName: "",
      dataTypeName: "",
      availableDataTypes: ["Date", "Number", "Text"],
      selectedOption: null
    };
  },
  methods: {
    ...mapActions(["setDataTypeAction"]),
    setDataType() {
      this.setDataTypeAction({
        fieldName: this.fieldName,
        dataTypeName: this.dataTypeName,
        selectedOption: this.selectedOption
      });
    },
    setToNull() {
      this.selectedOption = null;
    },
    setDefaultNumber() {
      this.selectedOption = "0";
    }
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataSelectedFieldNames",
      "dataSchema"
    ]) // can be used as variable and state are both named 'rows'
  }
};
</script>

<style scoped>
/* CUSTOM RADIO BUTTON */
/* The container */
.custom-radio {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 6px;
  margin-top: 6px;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.custom-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.radiomark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: var(--field-grey);
  border-radius: 50%;
}

/* When the radio button is checked, add a blue background */
.custom-radio input:checked ~ .radiomark {
  background-color: var(--field-grey);
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.radiomark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.custom-radio input:checked ~ .radiomark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.custom-radio .radiomark:after {
  top: 6px;
  left: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--paragraph);
}
</style>