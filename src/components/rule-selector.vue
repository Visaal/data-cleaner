<template>
  <div class="test">
    <fieldset>
      <h4>Data Cleaners</h4>
      <label for="rule_name">Select Option:</label>
      <select v-model="rule_name">
        <option value="JoinFields">Join Fields</option>
        <option value="LookUps">Create LookUp</option>
        <option value="Capitalise">Capitalise</option>
        <option value="FixDataType">Fix Inconsistent Data Type</option>
        <option value="StringSearch">Extract Sub Strings</option>
        <option value="characterExtract">Extract Characters</option>
        <option value="ChangeValue">Change Value</option>
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
    JoinFields: () => import("@/components/join-fields.vue"),
    LookUps: () => import("@/components/lookups.vue"),
    Capitalise: () => import("@/components/capitalise.vue"),
    ChangeValue: () => import("@/components/change-value.vue"),
    FixDataType: () => import("@/components/fix-data-type.vue"),
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
