<template>
  <div class="test">
    <fieldset>
      <h4>Data Cleaners</h4>
      <label for="rule_name">Select Option:</label>
      <select v-model="rule_name">
        <option value="Capitalise">Capitalise</option>
        <option value="FixDataType">Fix Inconsistent Data Type</option>
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
    Capitalise: () => import("@/components/capitalise.vue"),
    ChangeValue: () => import("@/components/change-value.vue"),
    FixDataType: () => import("@/components/fix-data-type.vue")
  },
  props: {
    rule: {
      type: String,
      default: "THE DEFAULT STRING"
    }
  },
  data() {
    return {
      rule_name: ""
    };
  },
  computed: {
    currentRule() {
      return this.rule_name;
    }
  }
};
</script>

<style></style>
