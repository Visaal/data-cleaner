<template>
  <div class="form-container">
    <div class="file-selector">
      <fieldset>
        <label for="fileItem">Please select your file</label>
        <input id="fileItem" type="file" @change="getFile($event)" />
        <span>{{ message }}</span>
        <button @click="processFile">Process File</button>
        <div>
          <router-link to="/DataCleaner">Data Cleaner</router-link>
        </div>
      </fieldset>
    </div>
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
.form-container {
  width: 20%;
  height: 100%;
  display: table;
  margin: auto;
}

.file-selector {
  display: table-cell;
  vertical-align: middle;
}

input[type="file"],
select {
  display: inline-block;
  font-family: menlo;
  height: 30px;
  line-height: 30px;
  color: var(--paragraph);
  background-color: var(--field-grey);
  border: none;
  font-size: 0.9rem;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  box-sizing: border-box;
  vertical-align: top;
  outline: 0;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 8px;
}
</style>
