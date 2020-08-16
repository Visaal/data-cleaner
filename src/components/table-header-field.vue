<template>
  <td class="custom-field-header" :id="field" :class="{ 'user-created-field': userCreatedField }">
    <div class="field-name">
      {{ field }}
      <FieldFilter :field="field" />
    </div>
    <div class="data-type">{{ dataType }}</div>
    <div class="data-match">
      <progress
        :value="primaryTypeValue"
        :max="numberOfRecords"
        @click="fieldBreakdownDisplayed = !fieldBreakdownDisplayed"
      ></progress>
    </div>
    <transition name="slide">
      <div v-if="fieldBreakdownDisplayed" class="breakdown-position">
        <FieldBreakdown :field="field" @closeFieldBreakdown="closeFieldBreakdown" />
      </div>
    </transition>
  </td>
</template>

<script>
import FieldFilter from "@/components/field-filter.vue";
import FieldBreakdown from "@/components/field-breakdown.vue";

export default {
  name: "TableHeaderField",
  components: {
    FieldFilter,
    FieldBreakdown
  },
  props: {
    field: String,
    dataType: String,
    numberOfRecords: Number,
    primaryTypeValue: Number,
    userCreatedField: Boolean
  },
  data() {
    return {
      fieldBreakdownDisplayed: false
    };
  },
  methods: {
    showFieldBreakdown(field) {
      this.fieldBreakdownDisplayed = true;
      console.log(`will show breakdown for ${field}`);
    },
    closeFieldBreakdown() {
      this.fieldBreakdownDisplayed = false;
    }
  }
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(33vw);
}

.breakdown-position {
  position: absolute;
  top: 5vh;
  right: 0;
}

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
