<template>
  <div class="container">
    <div class="header">{{ dataFileName }}</div>

    <div class="side-panel">
      <RuleSelector />
    </div>

    <div class="content-action-menu">
      <ContentActionMenu />
    </div>

    <div class="content">
      <DataView />
    </div>

    <div class="footer">This is the footer</div>
  </div>
</template>

<script>
// @ is an alias to /src
import RuleSelector from "@/components/rule-selector.vue";
import DataView from "@/components/data-view.vue";
import ContentActionMenu from "@/components/content-action-menu.vue";
import { mapState } from "vuex";

export default {
  name: "DataCleaner",
  components: {
    RuleSelector,
    DataView,
    ContentActionMenu
  },
  computed: {
    ...mapState(["dataFileName"])
  }
};
</script>

<style>
.parent {
  grid-template-rows: repeat(4, 1fr);
}

.container {
  height: 100%;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 40px 90px auto 40px;
  background-color: var(--background);
}

.header {
  color: var(--headline);
  grid-column: 1 / -1;
  background-color: var(--teritary);
  line-height: 40px;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bolder;
}

.side-panel {
  grid-column: 1 / 3;
  color: var(--paragraph);
  margin: 10px;
  grid-row: 2/4;
  overflow-y: scroll;
}

.content-action-menu {
  grid-column: 3/-1;
  /* border-bottom: 2px solid var(--field-grey); */
}

.content {
  grid-column: 3 / -1;
  overflow-x: auto;
}

.footer {
  color: var(--headline);
  grid-column: 1 / -1;
  background-color: var(--teritary);
}

input[type="text"],
input[type="number"],
input[type="date"],
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
input[type="date"] {
  padding-right: 0px;
}

label {
  /* padding-top: 8px; */
  display: inline-block;
  /* min-height: 34px;
  line-height: 34px; */
  font-size: 0.8rem;
  color: var(--field-label);
  font-weight: 600;
  padding-right: 0px;
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

fieldset > h4 {
  margin-top: 0px;
}

table {
  border-collapse: collapse;
  color: var(--field-label);
  font-size: 0.7rem;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
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

table td,
table th {
  vertical-align: top;
  border: 1px solid var(--table-border);
  /* line-height: 15px; */
  padding: 5px;
}

tbody td {
  white-space: nowrap;
}

button {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--button);
  border: 1px solid var(--button);
  color: var(--button-text);
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  padding: 0.65rem 2rem;
  font-size: 0.8rem;
  font-weight: 400;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  /* z-index: 1; */
}

button:hover {
  filter: brightness(107%);
}
</style>
