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
      <progress class="amount-progress" value="30" max="100"></progress>
      <br />
      <br />
      <div class="data-type-row">
        <div class="data-type-name">Missing Values:</div>
        <div class="data-type-stat">60</div>
        <div class="data-type-stat">80%</div>
      </div>
      <div class="data-type-row">
        <div class="data-type-name">Text:</div>
        <div class="data-type-stat">60</div>
        <div class="data-type-stat">80%</div>
      </div>
      <div class="data-type-row">
        <div class="data-type-name">Number:</div>
        <div class="data-type-stat">60</div>
        <div class="data-type-stat">80%</div>
      </div>
      <div class="data-type-row">
        <div class="data-type-name">Date:</div>
        <div class="data-type-stat">60</div>
        <div class="data-type-stat">80%</div>
      </div>
    </div>

    <div class="distinct-value-breakdown">
      <h3>Distinct Values</h3>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 1</div>
        <div class="distinct-value-stat">40</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 2</div>
        <div class="distinct-value-stat">60</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 3</div>
        <div class="distinct-value-stat">80</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 4</div>
        <div class="distinct-value-stat">140</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 5</div>
        <div class="distinct-value-stat">30</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 1</div>
        <div class="distinct-value-stat">40</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 2</div>
        <div class="distinct-value-stat">60</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 3</div>
        <div class="distinct-value-stat">80</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 4</div>
        <div class="distinct-value-stat">140</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 5</div>
        <div class="distinct-value-stat">30</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 1</div>
        <div class="distinct-value-stat">40</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 2</div>
        <div class="distinct-value-stat">60</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 3</div>
        <div class="distinct-value-stat">80</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 4</div>
        <div class="distinct-value-stat">140</div>
      </div>
      <div class="distinct-value-rows">
        <div class="distinct-value">Value 5</div>
        <div class="distinct-value-stat">30</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FieldBreakdown",
  props: {
    field: String,
    fieldBreakdownDisplayed: Boolean
  },
  methods: {
    closeFieldDetail() {
      this.$emit("closeFieldBreakdown");
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
  min-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.field-name-header {
  padding: 10px;
  background-color: var(--button);
  box-sizing: border-box;
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

.distinct-value-rows {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  display: flex;
  background-color: var(--teritary);
}

.distinct-value {
  width: 50%;
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