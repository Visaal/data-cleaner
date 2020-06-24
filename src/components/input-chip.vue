<template>
  <div class="chip-container">
    <div class="chip" v-for="(chip, i) of chips" :key="chip.label">
      {{chip}}
      <span @click="deleteChip(i)">×</span>
    </div>
    <input
      type="text"
      v-model="currentInput"
      @keypress.enter="saveChip"
      @keydown.delete="backspaceDelete"
    />
  </div>
</template>

<script>
export default {
  name: "InputChipContainer",
  data: function() {
    return {
      chips: [],
      currentInput: ""
    };
  },
  methods: {
    saveChip() {
      if (
        this.chips.indexOf(this.currentInput) === -1 &&
        this.currentInput.trim()
      ) {
        this.chips.push(this.currentInput);
      }
      this.currentInput = "";
    },
    deleteChip(index) {
      this.chips.splice(index, 1);
    },
    backspaceDelete({ which }) {
      which === 8 &&
        this.currentInput === "" &&
        this.chips.splice(this.chips.length - 1);
    }
  },
  watch: {
    chips: function() {
      this.$emit("input-values", this.chips);
    }
  }
};
</script>

<style>
.chip-container {
  color: var(--paragraph);
  background-color: var(--field-grey);
  border: none;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.chip-container .chip {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--background);
  text-decoration: none;
  line-height: 18px;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  margin: 3px;
  vertical-align: text-top;
  background: var(--field-label);
  border: 1px solid var(--field-label);
  align-items: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

.chip-container .chip span {
  cursor: pointer;
  opacity: 0.6;
}
.chip-container input[type="text"] {
  border: none;
  outline: none;
  margin: 0px;
}
</style>