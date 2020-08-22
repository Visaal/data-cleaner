<template>
  <div>
    <table>
      <thead>
        <td>Row #</td>
        <TableHeaderField
          v-for="field in dataSelectedFieldNames"
          :key="field.id"
          :field="field"
          :dataType="dataSchema[field]['likelyDataType']"
          :fieldSchema="dataSchema[field]"
          :numberOfRecords="dataRows.length"
          :nullValues="dataSchema[field]['null']"
          :userCreatedField="dataSchema[field]['userCreatedField']"
        />
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in dataRowsToDisplay.slice(
            rowStartSliceIndex,
            rowEndSliceIndex
          )"
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
import TableHeaderField from "@/components/table-header-field.vue";

export default {
  name: "DataView",
  components: {
    TableHeaderField
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataFileName",
      "dataSelectedFieldNames",
      "numberOfRowsToDisplay",
      "rowStartSliceIndex",
      "dataSchema"
    ]),
    ...mapGetters(["rowEndSliceIndex", "dataRowsToDisplay"])
  }
};
</script>

<style></style>
