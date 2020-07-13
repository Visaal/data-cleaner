<template>
  <td class="custom-field-header" :id="field">
    <div class="field-name">{{ field }} <FieldFilter :field="field" /></div>
    <div class="data-type">{{ dataType }}</div>
    <div class="data-match">
      <progress :value="primaryTypeValue" :max="numberOfRecords"></progress>
    </div>
  </td>
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
    primaryTypeValue: Number,
  },
};
</script>

<style>
.custom-field-header {
  margin: 0px;
  padding: 0px;
  background-color: var(--field-grey);
  white-space: nowrap;
  /* position: relative; */
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
