<template>
  <div>
    <table>
      <thead>
        <th>Row #</th>
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
          <td v-for="field in dataSelectedFieldNames" :key="field.id">
            {{ row[field] }}
          </td>
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
    TableHeaderField,
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
      "dataSchema",
    ]),
    ...mapGetters(["rowEndSliceIndex", "dataRowsToDisplay"]),
  },
};
</script>

<style>
table {
  /* border-collapse: collapse; */
  border-collapse: separate;
  border-spacing: 0;
  color: var(--field-label);
  font-size: 0.7rem;
  position: relative;
  z-index: 0;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  text-align: left;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

table td {
  border-bottom: 1px solid;
  border-right: 1px solid;
  vertical-align: top;
  border-color: var(--table-border);
  /* line-height: 15px; */
  padding: 5px;
}

table th {
  vertical-align: top;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: var(--table-border);
  /* line-height: 15px; */
  padding: 5px;
  position: sticky;
  position: -webkit-sticky;
  top: 0; /* Don't forget this, required for the stickiness */
}

tbody td {
  white-space: nowrap;
}

table th:first-child,
table td:first-child {
  /* Apply a left border on the first <td> or <th> in a row */
  border-left: 1px solid;
  border-color: var(--table-border);
}
</style>
