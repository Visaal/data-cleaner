<template>
  <div>
    <fieldset>
      <label for="fieldToExtractFrom">Select Field:</label>
      <select v-model="fieldToExtractFrom">
        <option v-for="field in dataSelectedFieldNames" :key="field.id">
          {{
          field
          }}
        </option>
      </select>

      <label for="actionToTake">Extract Characters:</label>
      <select name id v-model="selectedOption">
        <option value="front">From the Front</option>
        <option value="end">From the End</option>
        <option value="between">Between Two Points</option>
      </select>

      <div v-if="selectedOption === 'front'">
        <label>Set Characters to Take:</label>
        <input type="number" min="1" v-model="charactersFromFront" />
      </div>

      <div v-if="selectedOption === 'end'">
        <label>Set Characters to Take:</label>
        <input type="number" min="1" v-model="charactersFromEnd" />
      </div>

      <div v-if="selectedOption === 'between'" class="between">
        <label>Set Start & End Characters:</label>
        <input type="number" min="0" v-model="startCharacter" />
        <div class="field-text">&</div>
        <input type="number" min="0" v-model="endCharacter" />
      </div>

      <div>
        <button v-on:click="applyRule">Apply</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fieldToExtractFrom: "",
      selectedOption: "",
      charactersFromFront: "",
      charactersFromEnd: "",
      startCharacter: "",
      endCharacter: ""
    };
  },
  methods: {
    applyRule() {
      console.log("will slice string");
    }
  },
  computed: {
    ...mapState(["dataFieldNames", "dataSelectedFieldNames"])
  }
};
</script>

<style scoped>
.field-text {
  display: inline-block;
  width: 10%;
  text-align: center;
}

.between {
  width: 100%;
}

.between > input[type="number"] {
  width: 45%;
  vertical-align: unset;
}
</style>