<template>
  <div>
    <h1>Data</h1>
    <table>
      <thead>
        <td>Row #</td>
        <td v-for="field in distinctFieldNames" :key="field.id">{{ field }}</td>
      </thead>
      <tbody>
        <tr v-for="(row, index) in dataRows" :key="row.id">
          <td>{{ index + 1 }}</td>
          <td v-for="field in distinctFieldNames" :key="field.id">{{ row[field] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DataView",
  created() {
    this.getData();
  },
  methods: {
    // use helper function from vuex to get the actions defined
    ...mapActions(["getDataSourceData"]),
    async getData() {
      await this.getDataSourceData();
    }
  },
  computed: {
    ...mapState(["dataRows", "distinctFieldNames"]) // can be used as variable and state are both named 'rows'
  }
};
</script>

<style>
</style>