<template>
  <div>
    <table>
      <thead>
        <td>Row #</td>
        <!-- <td v-for="field in dataSelectedFieldNames" :key="field.id">
        {{ field }}-->
        <!-- TODO: FIX amount - need to know highest for likely data type -->
        <TableHeaderField
          v-for="field in dataSelectedFieldNames"
          :key="field.id"
          :field="field"
          :dataType="dataSchema[field]['likelyDataType']"
          :numberOfRecords="dataRows.length"
          :primaryTypeValue="getLikelyDataTypeCount(dataSchema[field])"
        />
        <!-- </td> -->
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
import TableHeaderField from "@/components/table-header-field.vue";

export default {
  name: "DataView",
  components: {
    TableHeaderField
  },
  data() {
    return {};
  },
  methods: {
    getLikelyDataTypeCount(fieldSchema) {
      let likelyDataType = fieldSchema["likelyDataType"];
      return fieldSchema[likelyDataType];
    }
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
    ...mapGetters(["rowEndSliceIndex"])
  }
};
</script>

<style></style>
