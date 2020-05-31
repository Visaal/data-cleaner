<template>
  <div>
    <!-- <h1>DATA</h1> -->
    <button @click="previousPage()">&lt;</button>
    <select v-model="rowsToDisplay" @change="setRowPerPage(rowsToDisplay)">
      <option>10</option>
      <option>50</option>
      <option>100</option>
      <option>250</option>
      <option>500</option>
    </select>
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
</style>