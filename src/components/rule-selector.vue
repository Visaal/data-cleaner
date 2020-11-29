<template>
  <div class="test">
    <fieldset>
      <h4>Data Cleaners</h4>
      <label for="rule_name">Select Option:</label>
      <select v-model="rule_name">
        <option value="FindReplace">Find and Replace</option>
        <option value="DateOptions">Format Dates</option>
        <option value="JoinFields">Join Fields</option>
        <option value="Lookups">Create Lookup</option>
        <option value="Capitalise">Capitalise</option>
        <option value="FixDataType">Fix Inconsistent Data Type</option>
        <option value="StringSearch">Extract Sub Strings</option>
        <option value="characterExtract">Extract Characters</option>
      </select>
    </fieldset>

    <component v-bind:is="currentRule" class></component>

    <div v-if="rule_name"></div>
  </div>
</template>

<script>
export default {
  name: "RuleSelector",
  components: {
    FindReplace: () => import("@/components/find-and-replace.vue"),
    DateOptions: () => import("@/components/date-options.vue"),
    JoinFields: () => import("@/components/join-fields.vue"),
    Lookups: () => import("@/components/lookups.vue"),
    Capitalise: () => import("@/components/capitalise.vue"),
    StringSearch: () => import("@/components/string-search.vue"),
    characterExtract: () => import("@/components/extract-characters.vue"),
  },
  props: {
    rule: {
      type: String,
      default: "THE DEFAULT STRING",
    },
  },
  data() {
    return {
      rule_name: "",
    };
  },
  computed: {
    currentRule() {
      return this.rule_name;
    },
  },
};
</script>

<style></style>
