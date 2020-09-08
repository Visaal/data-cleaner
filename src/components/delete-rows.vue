<template>
  <div class="delete-action">
    <button
      ref="deleteButton"
      class="action-bar-button"
      @click="
        showDeleteActions();
        calculatePosition();
      "
    >
      <strong>DELETE</strong>
    </button>
    <fieldset
      v-if="showDeleteOptions"
      class="active-filters"
      :style="positionStyle"
      ref="deleteOptionBox"
    >
      <div class="filter-box-search">
        <h3>Select Action</h3>
      </div>

      <div class="filter-value-list expanded">
        <div v-if="Object.keys(activeFilterValues).length">
          <label class="custom-radio" name="deleteRows">
            <input
              type="radio"
              name="deleteOption"
              value="delete"
              v-model="selectedOption"
            />
            <span class="radiomark" name="deleteRows"></span>Delete
            {{ dataRowsToDisplay.length }} Filtered Rows <br />
            ({{ dataRows.length - dataRowsToDisplay.length }}
            rows will be kept)
          </label>
          <br />
          <label class="custom-radio" name="deleteRows">
            <input
              type="radio"
              name="deleteOption"
              value="keep"
              v-model="selectedOption"
            />
            <span class="radiomark" name="deleteRows"></span>Keep
            {{ dataRowsToDisplay.length }} Filtered Rows
            <br />
            ({{ dataRows.length - dataRowsToDisplay.length }}
            rows will be deleted)
          </label>
        </div>
        <div v-else>
          Please filter on some data to show delete options
        </div>
      </div>

      <div class="filter-list-actions">
        <button @click="deleteRows">
          Apply
        </button>
        <button class="secondary" @click="cancelDelete">
          Cancel
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteRows",
  data() {
    return {
      showDeleteOptions: false,
      selectedOption: null,
      positionStyle: {
        top: "0px",
        left: "0px",
      },
    };
  },
  methods: {
    ...mapActions(["deleteRowsAction"]),
    showDeleteActions() {
      this.showDeleteOptions = !this.showDeleteOptions;
    },
    deleteRows() {
      this.deleteRowsAction(this.selectedOption);
      this.showDeleteOptions = !this.showDeleteOptions;
    },
    cancelDelete() {
      this.showDeleteOptions = !this.showDeleteOptions;
    },
    calculatePosition() {
      this.$nextTick(() => {
        if (this.showDeleteOptions) {
          let leftAdjustment = this.$refs.deleteOptionBox.clientWidth;
          let rightPosition = this.$refs.deleteButton.getBoundingClientRect()
            .right;
          let topPosition = this.$refs.deleteButton.getBoundingClientRect()
            .bottom;
          this.positionStyle.left = `${rightPosition - leftAdjustment}px`;
          this.positionStyle.top = `${topPosition}px`;
        }
      });
    },
  },
  computed: {
    ...mapState(["dataRows", "numberOfRowsToDisplay", "activeFilterValues"]),
    ...mapGetters(["rowEndSliceIndex", "dataRowsToDisplay"]),
  },
};
</script>

<style>
.delete-action {
  display: inline-block;
}

/* CUSTOM RADIO BUTTON */
/* The container */
.custom-radio {
  display: block;
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: lighter;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: var(--paragraph);
}

/* Hide the browser's default radio button */
.custom-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.radiomark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 1rem;
  width: 1rem;
  background-color: var(--field-grey);
  border-radius: 0.5rem;
}

/* When the radio button is checked, add a blue background */
.custom-radio input:checked ~ .radiomark {
  background-color: var(--field-grey);
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.radiomark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.custom-radio input:checked ~ .radiomark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.custom-radio .radiomark:after {
  top: 0.25rem;
  left: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: var(--paragraph);
}
</style>
