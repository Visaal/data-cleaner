<template>
  <div id="app">
    <!-- <router-link to="/DataCleaner">Data Cleaner</router-link>| -->
    <!-- <router-link to="/about">About</router-link> -->
    <router-view></router-view>
  </div>
</template>

<style>
:root {
  font-family: menlo;
  font-size: 0.9rem;
  font-style: normal;
  --background: #fffffe;
  --headline: #272343;
  --paragraph: #2d334a;
  --button: #ffd803;
  --button-text: #272343;
  --stroke: #272343;
  --highlight: #ffd803;
  --secondary: #e3f6f5;
  --teritary: #bae8e8;
  --field-grey: #eef2f8;
  --field-label: #546778;
  --table-border: #ccc;
  color: var(--stroke);
  --header-height: 40px;
  --footer-height: 40px;
}

html,
body,
#app {
  margin: 0px;
  height: 100%;
}
</style>
