<template>
  <th
    class="custom-field-header"
    :id="field"
    :class="{ 'user-created-field': userCreatedField }"
    ref="fieldTableHeader"
  >
    <div class="field-name">
      {{ field }}
      <FieldFilter :field="field" :positionStyle="headerLocation" />
    </div>
    <div class="data-type">{{ dataType }}</div>
    <div class="data-match">
      <progress
        :value="numberOfRecords - nullValues"
        :max="numberOfRecords"
        @click="showFieldBreakdown(field)"
      ></progress>
    </div>
  </th>
</template>

<script>
import FieldFilter from "@/components/field-filter.vue";

export default {
  name: "TableHeaderField",
  components: {
    FieldFilter,
  },
  props: {
    field: String,
    dataType: String,
    numberOfRecords: Number,
    userCreatedField: Boolean,
    fieldSchema: Object,
    nullValues: Number,
  },
  data() {
    return {
      fieldBreakdownDisplayed: false,
      headerLocation: {
        top: "",
        left: "",
      },
    };
  },
  mounted() {
    this.headerLocation["left"] =
      this.$refs.fieldTableHeader.getBoundingClientRect().left + "px";
    this.headerLocation["top"] =
      this.$refs.fieldTableHeader.getBoundingClientRect().bottom + "px";
  },
  methods: {
    showFieldBreakdown(field) {
      this.$emit("openFieldBreakdown", field);
    },
  },
};
</script>

<style>
.custom-field-header {
  margin: 0px;
  padding: 0px;
  background-color: var(--field-grey);
  white-space: nowrap;
  border-color: var(--table-border);
}

.field-name {
  padding: 5px;
  font-weight: 800;
}

.data-type {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 0.7rem;
  font-weight: 500;
}

.data-match {
  padding: 0px;
  font-size: 0.5rem;
  cursor: pointer;
}

.user-created-field {
  background-color: var(--secondary);
}

progress {
  border-radius: 1px;
  width: 100%;
  height: 8px;
  font-size: 1rem;
}
progress::-webkit-progress-value {
  transition: width 2s ease-out;
  background-color: var(--field-label);
}
progress::-webkit-progress-bar {
  background-color: var(--button);
}
progress::-moz-progress-bar {
  background-color: var(--button);
}
</style>
