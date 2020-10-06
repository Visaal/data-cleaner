<template>
  <div class="chart-action">
    <button
      ref="chartButton"
      class="action-bar-button"
      :id="fieldID"
      @click="
        showChartActions();
        calculatePosition();
        calculateSize();
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        class="action-icon"
      >
        <path fill="none" d="M0 0H24V24H0z" />
        <path
          d="M5 3v16h16v2H3V3h2zm15.293 3.293l1.414 1.414L16 13.414l-3-2.999-4.293 4.292-1.414-1.414L13 7.586l3 2.999 4.293-4.292z"
        />
      </svg>
    </button>

    <fieldset
      v-if="showChartOptions"
      class="chart-container"
      :style="positionStyle"
      ref="chartOptionBox"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        class="chart-option-button"
      >
        <path fill="none" d="M0 0H24V24H0z" />
        <path
          d="M5 3v16h16v2H3V3h2zm15.293 3.293l1.414 1.414L16 13.414l-3-2.999-4.293 4.292-1.414-1.414L13 7.586l3 2.999 4.293-4.292z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        class="chart-option-button"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M11 .543c.33-.029.663-.043 1-.043C18.351.5 23.5 5.649 23.5 12c0 .337-.014.67-.043 1h-1.506c-.502 5.053-4.766 9-9.951 9-5.523 0-10-4.477-10-10 0-5.185 3.947-9.449 9-9.95V.542zM11 13V4.062A8.001 8.001 0 0 0 12 20a8.001 8.001 0 0 0 7.938-7H11zm10.448-2A9.503 9.503 0 0 0 13 2.552V11h8.448z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        class="chart-option-button"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M2 13h6v8H2v-8zm14-5h6v13h-6V8zM9 3h6v18H9V3zM4 15v4h2v-4H4zm7-10v14h2V5h-2zm7 5v9h2v-9h-2z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        class="chart-option-button"
      >
        <path fill="none" d="M0 0L24 0 24 24 0 24z" />
        <path
          d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm10 6c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zM6 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm8.5-12C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2zm0 2C12.567 4 11 5.567 11 7.5s1.567 3.5 3.5 3.5S18 9.433 18 7.5 16.433 4 14.5 4z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        class="chart-option-button"
      >
        <path fill="none" d="M0 0H24V24H0z" />
        <path
          d="M11 2.05v3.02C7.608 5.557 5 8.475 5 12c0 3.866 3.134 7 7 7 1.572 0 3.024-.518 4.192-1.394l2.137 2.137C16.605 21.153 14.4 22 12 22 6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9-9.95zM21.95 13c-.2 2.011-.994 3.847-2.207 5.328l-2.137-2.136c.687-.916 1.153-2.006 1.323-3.192h3.022zM13.002 2.05c4.724.469 8.48 4.226 8.95 8.95h-3.022c-.438-3.065-2.863-5.49-5.928-5.929V2.049z"
        />
      </svg>
      <div>
        <label for="fieldName">Select x-axis</label>
        <select v-model="xFieldName">
          <option v-for="field in dataSelectedFieldNames" :key="field">
            {{ field }}
          </option>
        </select>
      </div>
      <div>
        <label for="fieldName">Select y-axis</label>
        <select v-model="yFieldName">
          <option v-for="field in dataSelectedFieldNames" :key="field">
            {{ field }}
          </option>
        </select>
      </div>
      <button @click="generateChart()">
        Chart Data
      </button>
      <div v-if="showChart">
        <column-chart :data="columnData" :options="chartOptions" />
      </div>
    </fieldset>
  </div>
</template>

<script>
import "tui-chart/dist/tui-chart.css";
import { columnChart } from "@toast-ui/vue-chart";
import { mapState } from "vuex";

export default {
  name: "ChartRows",
  props: {
    fieldID: String,
  },
  components: {
    "column-chart": columnChart,
  },
  data() {
    return {
      showChartOptions: false,
      showChart: false,
      positionStyle: {
        top: "0px",
        left: "0px",
      },
      xFieldName: "",
      yFieldName: "",
      chartTitle: "Placeholder",
      columnData: {},
      chartOptions: {},
      containerWidth: 0,
      containerHeight: 0,
    };
  },
  created() {},
  methods: {
    showChartActions() {
      this.showChartOptions = !this.showChartOptions;
    },
    calculatePosition() {
      this.$nextTick(() => {
        if (this.showChartOptions) {
          let screenWidth = window.innerWidth;
          let chartAreaWidth = this.$refs.chartOptionBox.clientWidth;
          let topPosition = this.$refs.chartButton.getBoundingClientRect()
            .bottom;
          this.positionStyle.left = `${screenWidth / 2 - chartAreaWidth / 2}px`;
          this.positionStyle.top = `${topPosition}px`;
        }
      });
    },
    calculateSize() {
      if (this.showChartOptions) {
        this.$nextTick(() => {
          this.containerWidth = this.$refs.chartOptionBox.clientWidth;
          this.containerHeight = this.$refs.chartOptionBox.clientHeight;
        });
      }
    },
    generateChartOptions() {
      this.chartOptions = {
        chart: {
          width: this.containerWidth * 0.95,
          height: this.containerHeight * 0.7,
          title: this.chartTitle,
        },
        yAxis: {
          title: "Temperature (Celsius)",
          pointOnColumn: true,
        },
        xAxis: {
          title: "Years",
        },
        series: {
          showDot: true,
          zoomable: true,
        },
        tooltip: {
          suffix: "°C",
        },
      };
    },
    generateChart() {
      this.showChart = false;
      // Determine x-axis values
      let allDistinctXValues = {};
      for (const [key] of Object.entries(
        this.dataSchema[this.xFieldName]["distinctValues"]
      )) {
        Object.assign(
          allDistinctXValues,
          this.dataSchema[this.xFieldName]["distinctValues"][key]
        );
      }
      let categories = Object.keys(allDistinctXValues);

      let series;
      // If y-axis selection is equal to x-axis selection or empty then display count of categories
      if (this.xFieldName === this.yFieldName || this.yFieldName === "") {
        this.chartTitle = `Count of ${this.xFieldName}`;
        let valueRows = Object.values(allDistinctXValues);
        let categoryCounts = [];
        for (let i = 0; i < valueRows.length; i++) {
          categoryCounts.push(valueRows[i].length);
        }
        series = [
          {
            name: "Count",
            data: categoryCounts,
          },
        ];
      } else {
        // If y-aixs field is different then multiple series need to be generated
        this.chartTitle = `${this.yFieldName} by ${this.xFieldName}`;

        let allDistinctYValues = {};
        for (const [key] of Object.entries(
          this.dataSchema[this.yFieldName]["distinctValues"]
        )) {
          Object.assign(
            allDistinctYValues,
            this.dataSchema[this.yFieldName]["distinctValues"][key]
          );
        }

        let seriesNames = Object.keys(allDistinctYValues);
        // Series data structure
        // series: [
        //   {
        //     name: "Budget",
        //     data: [3000, 5000, 7000, 6000, 4000],
        //   },
        //   {
        //     name: "Income",
        //     data: [1000, 7000, 2000, 5000, 3000],
        //   },
        // ],
        series = [];
        seriesNames.forEach((seriesName) =>
          series.push({ name: seriesName, data: [] })
        );

        // For each category (x axis) value get the instersection of the series (y axis) values
        for (let i = 0; i < categories.length; i++) {
          // Row indexes of distinct x fields
          let array1 = allDistinctXValues[categories[i]];

          for (let j = 0; j < seriesNames.length; j++) {
            // Row indexes of distinct Y fields
            let array2 = allDistinctYValues[seriesNames[j]];

            let instersectionRowIndexes = array1.filter((value) =>
              array2.includes(value)
            );
            series[j]["data"].push(instersectionRowIndexes.length);
          }
        }
      }
      this.columnData = {
        categories: categories,
        series,
      };
      this.$nextTick(() => {
        this.generateChartOptions();
        this.showChart = true;
      });
    },
  },
  computed: {
    ...mapState([
      "dataRows",
      "dataFieldNames",
      "dataSelectedFieldNames",
      "dataSchema",
    ]),
  },
};
</script>

<style>
.chart-container {
  z-index: 1;
  min-width: 90%;
  max-width: 90%;
  min-height: 80%;
  max-height: 80%;
  position: absolute;
  background: var(--background);
  -webkit-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 7px 23px 0px rgba(50, 50, 50, 0.5);
  overflow: auto;
  width: auto;
  box-sizing: border-box;
}

.chart-action {
  display: inline-block;
}

.chart-option-button {
  margin: 0.2rem;
  /* height: 30px; */
  /* line-height: 30px; */
  background-color: var(--field-grey);
  border-color: var(--field-grey);
  color: var(--button-text);
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  padding: 0.3rem 0.3rem;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
}
</style>
