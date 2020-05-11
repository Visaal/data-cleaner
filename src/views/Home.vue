<template>
  <div class="form-container">
    <div class="file-selector">
      <fieldset>
        <label for="fileItem">Please select your file</label>
        <input id="fileItem" type="file" @change="getFile($event)" />
        <span>{{ message }}</span>
        <button @click="showContents">Process File</button>
        <div>
          <router-link to="/DataCleaner">Data Cleaner</router-link>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      fileItem: "",
      message: ""
    };
  },
  methods: {
    getFile(event) {
      this.fileData = event.target.files[0];
      this.fileItem = this.fileData;
    },
    showContents() {
      if (this.fileItem) {
        this.message = "";
        console.log(this.fileItem);
        let reader = new FileReader();

        reader.readAsText(this.fileItem);

        reader.onload = function() {
          console.log(reader.result);
        };

        reader.onerror = function() {
          console.log(reader.error);
        };
      } else {
        this.message = "please select a file";
      }
    }
  }
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