<template>
  <div>
    <h1>Data</h1>
    <button @click="loadMoreData()">LOAD MORE DATA</button>
    <table>
      <thead>
        <td>Row #</td>
        <td v-for="field in dataSelectedFieldNames" :key="field.id">{{ field }}</td>
      </thead>
      <tbody>
        <tr v-for="(row, index) in dataRows.slice(dataRowStart, dataLimit)" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-for="field in dataSelectedFieldNames" :key="field.id">{{ row[field] }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="loadMoreData()">LOAD MORE DATA</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DataView",
  data() {
    return {
      dataRowStart: 0,
      dataLimit: 10
    };
  },
  methods: {
    loadMoreData() {
      this.dataRowStart += 10;
      this.dataLimit += 10;
    }
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataFileName",
      "dataSelectedFieldNames"
    ]) // can be used as variable and state are both named 'dataRows'
  }
};
</script>

<style></style>
