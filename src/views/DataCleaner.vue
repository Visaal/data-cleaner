<template>
  <div class="container">
    <div class="header">This is the header</div>

    <div class="side-panel">
      <RuleSelector />
    </div>

    <div class="content"></div>

    <div class="footer">This is the footer</div>
  </div>
</template>

<script>
// @ is an alias to /src
import RuleSelector from "@/components/rule-selector.vue";

export default {
  name: "DataCleaner",
  components: {
    RuleSelector
  }
};
</script>

<style>
.container {
  height: 100%;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 40px auto 40px;
  background-color: var(--background);
}

.header {
  color: var(--headline);
  grid-column: 1 / -1;
  background-color: var(--teritary);
}

.side-panel {
  grid-column: 1 / 3;
  color: var(--paragraph);
  margin: 10px;
}

.content {
  grid-column: 3 / -1;
}

.footer {
  color: var(--headline);
  grid-column: 1 / -1;
  background-color: var(--teritary);
}

input[type="text"],
select {
  display: inline-block;
  font-family: menlo;
  height: 30px;
  line-height: 30px;
  color: var(--paragraph);
  background-color: var(--field-grey);
  border: none;
  font-size: 0.9rem;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  box-sizing: border-box;
  vertical-align: top;
  outline: 0;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 8px;
}
input:focus {
  outline: none;
}

label {
  /* padding-top: 8px; */
  display: inline-block;
  /* min-height: 34px;
  line-height: 34px; */
  font-size: 0.8rem;
  color: var(--field-label);
  font-weight: 600;
  padding-right: 10px;
  padding-left: 0;
  vertical-align: top;
}

fieldset {
  display: block;
  padding: 10px;
  border: 2px solid var(--field-grey);
  border-radius: 4px;
  margin-bottom: 10px;
}

h4 {
  margin-top: 0px;
}
</style>
