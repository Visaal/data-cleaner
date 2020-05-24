<template>
  <div class="landing-page-form">
    <fieldset>
      <h2>Data Cleaner</h2>
      <label for="fileItem" class="custom-file-input-label">Select a file</label>
      <input id="fileItem" type="file" class="custom-file-input" @change="getFile($event)" />
      <span>{{ message }}</span>
      <span>{{ fileName }}</span>
      <div>
        <router-link :to="{ name: 'DataCleaner', params: { fileName: fileName }}">Data Cleaner</router-link>
      </div>
    </fieldset>
  </div>
</template>

<script>
import Papa from "papaparse";
import { mapState, mapActions } from "vuex";

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
      message: ""
    };
  },
  watch: {
    data: function() {
      this.updateState();
    }
  },
  methods: {
    ...mapActions(["setFieldNamesAction", "setDataAction", "updateDataAction"]),
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
        this.fieldNames = Object.keys(this.data[0]);
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
    }
  },
  computed: {
    ...mapState(["dataRows", "dataFieldNames", "dataFileName"]) // can be used as variable and state are both named 'dataRows'
  }
};
</script>

<style>
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

progress {
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
}
</style>
