<template>
  <div id="fieldBreakdown" class="field-detail-breakdown">
    <div class="field-name-header">
      <h3>
        {{ field }}
        <div @click="closeFieldDetail()" class="close">&#x2716;</div>
      </h3>
    </div>

    <div class="data-type-breakdown">
      <h3>Data Type Breakdown</h3>
      <progress class="amount-progress" :value="orderedValues[0][1].length" :max="recordCount"></progress>
      <br />
      <br />
      <div class="data-type-row">
        <div class="data-type-name">blank:</div>
        <div class="data-type-stat">0</div>
        <div class="data-type-stat">0%</div>
      </div>
      <div class="data-type-row" v-for="(value, key) in fieldSchema['distinctValues']" :key="key">
        <div class="data-type-name">{{ key }}:</div>
        <div class="data-type-stat">{{ fieldSchema[key] }}</div>
        <div class="data-type-stat">{{ fieldSchema[key]/recordCount | roundPercentage2DP }}</div>
      </div>
    </div>

    <div class="distinct-value-breakdown">
      <h3>Distinct Values</h3>
      <div class="distinct-values">
        <div class="distinct-value-rows" v-for="(value,index) in orderedValues" :key="index">
          <div class="distinct-value">{{value[0]}}</div>
          <div
            class="distinct-value-stat"
            :style="calculateWidth(value[1].length)"
          >{{value[1].length}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FieldBreakdown",
  props: {
    field: String,
    fieldBreakdownDisplayed: Boolean,
    recordCount: Number,
    fieldSchema: Object
  },
  methods: {
    closeFieldDetail() {
      this.$emit("closeFieldBreakdown");
    },
    calculateWidth(value) {
      let maxValueCount = this.orderedValues[0][1].length;
      let cssPercentageWidthValue = 100 - 68 - 4;
      let ratio = (value / maxValueCount) * cssPercentageWidthValue;
      return `width: ${ratio}%`;
    }
  },
  filters: {
    roundPercentage2DP: function(value) {
      return (value * 100).toFixed(0) + "%";
    }
  },
  computed: {
    orderedValues: function() {
      let allDistinctValues = {};
      for (const [key] of Object.entries(this.fieldSchema["distinctValues"])) {
        Object.assign(
          allDistinctValues,
          this.fieldSchema["distinctValues"][key]
        );
      }
      let entries = Object.entries(allDistinctValues);
      let sorted = entries.sort((a, b) => b[1].length - a[1].length);
      return sorted;
    }
  }
};
</script>

<style scoped>
.close {
  display: inline;
  cursor: pointer;
  position: absolute;
  padding: 0.2rem;
  top: 0.2rem;
  right: 0.3rem;
  font-size: 1.5rem;
}

.field-detail-breakdown {
  color: var(--stroke);
  border-bottom: 1px solid;
  border-color: var(--button);
  background-color: var(--teritary);
  width: 33vw;
  font-size: 0.9rem;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  max-height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow-y: auto;
  box-sizing: border-box;
}

.field-name-header {
  padding: 10px;
  background-color: var(--button);
  box-sizing: border-box;
  overflow-x: scroll;
}

.data-type-breakdown {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid;
  border-color: var(--field-grey);
}

.data-type-row {
  display: flex;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  background-color: var(--teritary);
}

.data-type-row:hover {
  filter: brightness(107%);
}

.data-type-name {
  width: 50%;
  padding: 0px;
  box-sizing: border-box;
}

.data-type-stat {
  width: 20%;
  padding: 0px;
  box-sizing: border-box;
}

.distinct-value-breakdown {
  padding: 10px;
}

.distinct-values {
}

.distinct-value-rows {
  font-size: 0.8rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  display: flex;
  background-color: var(--teritary);
}

.distinct-value {
  overflow-x: auto;
  width: 68%;
  margin-right: 4%;
}

.distinct-value-stat {
  width: 0%;
  background-color: var(--button);
  transition-delay: 10s;
  transition: 0.9s ease-in-out;
  transform-origin: left;
}

.distinct-value-rows:hover {
  filter: brightness(107%);
}
</style>