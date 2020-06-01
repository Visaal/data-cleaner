<template>
  <div>
    <!-- <h1>DATA</h1> -->
    <button @click="previousPage()">&lt;</button>
    <div class="selectWrapper">
      <select v-model="rowsToDisplay" @change="setRowPerPage(rowsToDisplay)">
        <option>10</option>
        <option>50</option>
        <option>100</option>
        <option>250</option>
        <option>500</option>
      </select>
    </div>
    <!-- <button @click="setRowPerPage()">LOAD MORE DATA</button> -->
    <button @click="nextPage()">&gt;</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ContentActionMenu",
  data() {
    return {
      rowsToDisplay: this.numberOfRowsToDisplay
    };
  },
  methods: {
    ...mapActions([
      "setFieldNamesAction",
      "setDataAction",
      "updateDataAction",
      "setSelectedFieldsAction",
      "setNumberOfRowsToDisplayAction",
      "setStartIndexNextPageAction",
      "setStartIndexPreviousPageAction"
    ]),
    setRowPerPage(rowsToDisplay) {
      this.setNumberOfRowsToDisplayAction(rowsToDisplay);
    },
    nextPage() {
      this.setStartIndexNextPageAction();
    },
    previousPage() {
      this.setStartIndexPreviousPageAction();
    }
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataFileName",
      "dataSelectedFieldNames",
      "numberOfRowsToDisplay",
      "rowStartSliceIndex"
    ]),
    ...mapGetters(["rowEndSliceIndex"])
  }
};
</script>

<style scoped>
.selectWrapper {
  border-radius: 0px;
  display: inline-block;
  overflow: hidden;
  background: var(--field-grey);
  border: 1px solid var(--field-grey);
  position: relative;
  top: 17px;
}
select {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0px;
}

button {
  height: 40px;
}
</style>