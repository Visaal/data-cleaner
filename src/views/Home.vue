<template>
  <div class="landing-page-form">
    <fieldset>
      <h2>Data Cleaner</h2>
      <label for="fileItem" class="custom-file-input-label"
        >Select a file</label
      >
      <input
        id="fileItem"
        type="file"
        class="custom-file-input"
        @change="getFile($event)"
      />
      <span>{{ message }}</span>
      <button @click="processFile">Process File</button>
      <div>
        <router-link to="/DataCleaner">Data Cleaner</router-link>
      </div>
    </fieldset>
  </div>
</template>

<script>
import Papa from "papaparse";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      fileItem: "",
      message: "",
      data: [1, 2, 3],
      fieldNames: [],
    };
  },
  methods: {
    ...mapActions(["setFieldNamesAction", "setDataAction"]),
    getFile(event) {
      this.fileItem = event.target.files[0];
    },
    processFile() {
      if (this.fileItem) {
        let reader = new FileReader();
        reader.readAsText(this.fileItem);

        // Use arrow function or bind rather than 'reader.onload = function(event) {}' as that would have it's own context
        //https://stackoverflow.com/questions/54113762/filereader-method-does-not-update-data-property-vue-js
        reader.onload = () => {
          this.fieldNames = Papa.parse(reader.result).data[0];
          this.data = Papa.parse(reader.result, { header: true }).data;
          this.setFieldNamesAction(this.fieldNames);
          this.setDataAction(this.data);
        };

        reader.onerror = () => {
          console.log(reader.error);
        };
      } else {
        this.message = "please select a file";
      }
    },
  },
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
</style>
