<template>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <img
          src="../assets/dc_logo.svg"
          alt=""
          class="logo"
          @click="navigateHome"
        />
      </div>
      <div class="file-name">{{ dataFileName }}</div>
    </div>

    <div class="side-panel">
      <RuleSelector />
    </div>

    <div class="content-action-menu">
      <ContentActionMenu />
    </div>

    <div class="content">
      <DataView />
    </div>

    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RuleSelector from "@/components/rule-selector.vue";
import DataView from "@/components/data-view.vue";
import ContentActionMenu from "@/components/content-action-menu.vue";
import Footer from "@/components/footer.vue";
import { mapState } from "vuex";
import router from "../router";

export default {
  name: "DataCleaner",
  components: {
    RuleSelector,
    DataView,
    ContentActionMenu,
    Footer,
  },
  methods: {
    navigateHome() {
      router.push({ path: "/" });
    },
  },
  computed: {
    ...mapState(["dataFileName"]),
  },
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
  background-color: var(--background);
  grid-template-areas:
    "header"
    "action-bar"
    "content"
    "sidebar"
    "footer";
  grid-template-rows: var(--header-height) 90px auto 200px var(--footer-height);
}

@media (min-width: 768px) {
  .container {
    height: 100%;
    display: grid;
    grid-gap: 0px;
    /* grid-template-columns: repeat(12, 1fr); */
    background-color: var(--background);
    grid-template-columns: 3fr 9fr;
    grid-template-areas:
      "header header"
      "sidebar  action-bar"
      "sidebar  content"
      "footer footer";
    grid-template-rows: var(--header-height) 90px auto var(--footer-height);
  }
}

.header {
  grid-area: header;
  position: relative;
  color: var(--paragraph);
  background-color: var(--secondary);
  line-height: var(--header-height);
  vertical-align: middle;
  font-weight: bolder;
  border-bottom: 2px var(--teritary) solid;
}

.logo-container {
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  position: absolute;
  vertical-align: middle;
  height: var(--header-height);
  overflow: hidden;
  border-right-color: var(--teritary);
  border-right-style: solid;
  border-width: 2px;
  box-sizing: border-box;
}

.logo {
  cursor: pointer;
  padding-top: 3px;
  height: 34px;
  width: 34px;
}

.file-name {
  position: absolute;
  left: 70px;
  vertical-align: middle;
  display: inline-block;
}

.side-panel {
  grid-area: sidebar;
  color: var(--paragraph);
  padding-top: 10px;
  padding-right: 5px;
  padding-left: 5px;
  overflow-y: scroll;
  border-right: 2px var(--secondary) solid;
}

.content-action-menu {
  margin-left: 10px;
  grid-area: action-bar;
  /* border-bottom: 2px solid var(--field-grey); */
}

.content {
  grid-area: content;
  overflow-x: auto;
  margin-left: 10px;
}

.footer {
  font-size: 0.8rem;
  color: var(--field-label);
  grid-area: footer;
  background-color: var(--secondary);
  border-top: 2px var(--teritary) solid;
  line-height: var(--header-height);
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
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

fieldset > button {
  padding: 0.65rem 0rem;
  width: 100%;
}
</style>
