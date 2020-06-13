<template>
  <td class="custom-field-header">
    <div class="field-name">{{ field }}</div>
    <div class="data-type">{{dataType}}</div>
    <div class="data-match">
      <progress :value="primaryTypeValue" :max="numberOfRecords"></progress>
    </div>
  </td>
</template>

<script>
export default {
  name: "TableHeaderField",
  props: {
    field: String,
    dataType: String,
    numberOfRecords: Number,
    primaryTypeValue: Number
  }
};
</script>

<style>
.custom-field-header {
  margin: 0px;
  padding: 0px;
  background-color: var(--field-grey);
  white-space: nowrap;
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