<template>
  <div>
    <!-- <div id="particles-js"></div> -->
    <fieldset :class="{ 'display-from-left': fileName }" class="hidden-left field-list-fieldset">
      <h3>Please Select Fields</h3>
      <div class="action-button-container">
        <button @click="updateState(), navigate()">Confirm</button>
        <button @click="cancelSelection()" class="secondary">Cancel</button>
      </div>

      <div class="field-list">
        <div v-for="(field, index) in fieldNames" :key="index">
          <label class="custom-checkbox">
            {{ field }}
            <input
              type="checkbox"
              :id="index"
              :name="field"
              :value="index"
              v-model="selectedFieldIndexes"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </fieldset>

    <div class="landing-page-form">
      <fieldset>
        <h2>Data Cleaner</h2>
        <label for="fileItem" class="custom-file-input-label">Select File To Clean</label>
        <input
          id="fileItem"
          type="file"
          class="custom-file-input"
          @change="getFile($event)"
          :accept="VALID_FILE_TYPES"
          ref="fileInput"
        />
        <span>{{ message }}</span>
        <span>{{ fileName }}</span>
      </fieldset>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
import { mapState, mapActions } from "vuex";
import router from "../router";
import "particles.js";

export default {
  name: "Home",
  data() {
    return {
      VALID_FILE_TYPES: ["text/csv"],
      fileItem: "",
      fileName: "",
      fileType: "",
      fileSize: 0,
      data: [],
      fieldNames: [],
      selectedFieldIndexes: [],
      message: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initParticles();
    });
  },
  watch: {
    data: function() {
      if (this.data.length) {
        this.fieldNames = Object.keys(this.data[0]);
        // Select all fields by default
        this.selectedFieldIndexes = [...Array(this.fieldNames.length).keys()];
      }
    }
  },
  methods: {
    initParticles() {
      let particleConfig = require("../assets/particles.json");
      window.particlesJS("particles-js", particleConfig);
    },
    ...mapActions([
      "setFieldNamesAction",
      "setDataAction",
      "updateDataAction",
      "setSelectedFieldsAction"
    ]),
    getFile(event) {
      this.fileItem = event.target.files[0];
      this.fileName = this.fileItem["name"];
      this.fileType = this.fileItem["type"];
      this.fileSize = this.fileItem["size"];
      if (this.VALID_FILE_TYPES.includes(this.fileType)) {
        this.convertFileToData();
      }
    },
    convertFileToData() {
      let reader = new FileReader();
      reader.readAsText(this.fileItem);
      // Use arrow function or bind rather than 'reader.onload = function(event) {}' as that would have it's own context
      //https://stackoverflow.com/questions/54113762/filereader-method-does-not-update-data-property-vue-js
      reader.onload = () => {
        this.data = Papa.parse(reader.result, { header: true }).data;
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    },
    updateState() {
      this.updateDataAction({
        fileName: this.fileName,
        data: this.data,
        fieldNames: this.fieldNames
      });
      this.setSelectedFieldsAction(this.selectedFieldNames);
    },
    navigate() {
      router.push({ path: "/DataCleaner" });
    },
    cancelSelection() {
      this.$refs.fileInput.value = ""; // use to allow the file to be reselected
      this.fileName = "";
      this.fileType = "";
      this.fileSize = 0;
      this.fieldNames = [];
      this.selectedFieldIndexes = [];
      this.message = "";
    }
  },
  computed: {
    ...mapState(["dataRows", "dataFieldNames", "dataFileName"]), // can be used as variable and state are both named 'dataRows'
    selectedFieldNames: function() {
      let fieldNamesInOrder = [];
      let sortedSelectedFieldIndexes = this.selectedFieldIndexes
        .slice()
        .sort((a, b) => a - b);
      for (let i = 0; i < sortedSelectedFieldIndexes.length; i++) {
        fieldNamesInOrder.push(this.fieldNames[sortedSelectedFieldIndexes[i]]);
      }
      return fieldNamesInOrder;
    }
  }
};
</script>

<style>
/* ---- particles.js container ---- */
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fffffe;
  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

.landing-page-form {
  /* https://css-tricks.com/centering-css-complete-guide/ */
  width: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.landing-page-form h1,
.landing-page-form h2,
.landing-page-form h3,
.landing-page-form h4,
.landing-page-form h5,
.landing-page-form h6 {
  text-align: center;
}

.custom-file-input {
  /* https://benmarshall.me/styling-file-inputs/ */
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
}

.custom-file-input-label {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--button);
  border: 1px solid var(--button);
  color: var(--button-text);
  text-align: center;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  padding: 0.65rem 0rem;
  font-size: 0.8rem;
  font-weight: 400;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  /* z-index: 1; */
  /* display: inline-block; */
  transition: background-color 0.3s;
}

.custom-file-input:focus,
.custom-file-input-label:hover {
  filter: brightness(107%);
}

/* progress {
  border-radius: 1px;
  width: 100%;
  height: 15px;
}
progress::-webkit-progress-bar {
  background-color: var(--field-grey);
}
progress::-webkit-progress-value {
  transition: width 2s ease-out;
  background-color: var(--field-label);
}
progress::-moz-progress-bar {
  background-color: var(--field-grey);
} */

/* FIELD LIST STYLING */
.hidden-left {
  position: absolute;
  left: -30vw;
  transition: 1.5s ease-in-out;
  margin-top: 20px;
  margin-bottom: 20px;
}

.display-from-left {
  transform: translateX(30vw);
  margin-left: 20px;
}

.field-list-fieldset {
  width: 20vw;
}

.field-list {
  margin-top: 10px;
  padding-bottom: 10px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.field-list-fieldset h3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.action-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 2px solid var(--field-grey);
}

.action-button-container button:first-child {
  margin-right: 4%;
}

.action-button-container button {
  width: 48%;
}

.secondary {
  background-color: var(--field-grey);
  border-color: var(--field-grey);
}

.secondary:hover {
  filter: brightness(93%);
}

/* CUSTOM CHECKBOX STYLING */
/* The container */
.custom-checkbox {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  padding-top: 5px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding-bottom: 9px;
  width: 100%;
}

/* Hide the browser's default checkbox */
.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: var(--field-grey);
  border-radius: 4px;
}

/* On mouse-over, add a grey background color */
.custom-checkbox:hover input ~ .checkmark {
  background-color: var(--field-grey);
}

/* When the checkbox is checked */
.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--field-grey);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  opacity: 0;
}

/* Show the checkmark when checked */
.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
  opacity: 1;
  transition: all 0.3s;
}

/* Style the checkmark/indicator */
.custom-checkbox .checkmark:after {
  left: 9px;
  top: 3px;
  width: 5px;
  height: 12px;
  border: solid var(--paragraph);
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
