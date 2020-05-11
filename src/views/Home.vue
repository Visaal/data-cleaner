<template>
  <div class="form-container">
    <div class="file-selector">
      <fieldset>
        <label for="fileItem">Please select your file</label>
        <input id="fileItem" type="file" />
        <div>
          <router-link to="/DataCleaner">Data Cleaner</router-link>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
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