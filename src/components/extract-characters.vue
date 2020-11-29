<template>
  <div>
    <fieldset>
      <label for="fieldToExtractFrom">Select Field:</label>
      <select v-model="fieldToExtractFrom">
        <option v-for="field in dataFieldNames" :key="field.id">
          {{ field }}
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
        <label>Set Start & End Chars:</label>
        <input type="number" min="0" v-model="startCharacter" />
        <div class="field-text">&</div>
        <input type="number" min="0" v-model="endCharacter" />
      </div>

      <div class="example-string" v-if="selectedOption">
        <span
          v-for="(letter, index) in exampleString"
          :key="index"
          :class="highLightText(index)"
          >{{ letter }}</span
        >
      </div>

      <div>
        <label for="newField">New Field Name:</label>
        <input type="text" v-model="newField" />
      </div>

      <div>
        <button v-on:click="applyRule">Apply</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      fieldToExtractFrom: "",
      selectedOption: "",
      charactersFromFront: "",
      charactersFromEnd: "",
      startCharacter: 0,
      endCharacter: 0,
      newField: "",
      exampleString: "example_text_to_slice",
    };
  },
  methods: {
    ...mapActions(["extractCharactersAction"]),
    applyRule() {
      this.extractCharactersAction({
        selectedOption: this.selectedOption,
        fieldToExtractFrom: this.fieldToExtractFrom,
        charactersFromFront: this.charactersFromFront,
        charactersFromEnd: this.charactersFromEnd,
        startCharacter: this.startCharacter,
        endCharacter: this.endCharacter,
        newField: this.newField,
      });
    },
    highLightText(index) {
      if (this.selectedOption === "front") {
        if (index < this.charactersFromFront) {
          return "in-slice";
        }
        return "removed";
      }
      if (this.selectedOption === "end") {
        if (index < this.exampleString.length - this.charactersFromEnd) {
          return "removed";
        }
        return "in-slice";
      }
      if (this.selectedOption === "between") {
        if (
          index < this.startCharacter ||
          index >= this.exampleString.length - this.endCharacter
        ) {
          return "removed";
        }
        return "in-slice";
      }
    },
  },
  watch: {
    fieldToExtractFrom: function(fieldValue) {
      let selectedField = document.getElementById(fieldValue);
      selectedField.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center",
      });
    },
  },
  computed: {
    ...mapState(["dataFieldNames", "dataSelectedFieldNames"]),
    ...mapGetters(["textFields"]),
  },
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
.in-slice {
  color: var(--headline);
  font-weight: bold;
}

.removed {
  color: var(--table-border);
}

.example-string {
  font-size: 0.9rem;
  font-style: italic;
  padding-bottom: 10px;
  text-align: center;
}
</style>
