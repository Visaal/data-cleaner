<template>
  <div>
    <table>
      <thead>
        <td>Row #</td>
        <td v-for="field in dataSelectedFieldNames" :key="field.id">{{ field }}</td>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in dataRows.slice(rowStartSliceIndex, rowEndSliceIndex)"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td v-for="field in dataSelectedFieldNames" :key="field.id">{{ row[field] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "DataView",
  data() {
    return {};
  },
  methods: {},
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

<style></style>
