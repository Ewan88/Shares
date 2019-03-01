<template>
  <div id="graph">

      <h2 id="heading">Share Tracker</h2>
      <div class="graphSelectorWrapper">
        <label for="chartType">Change Graph Type:</label>
        <select name="chartType" id="chartType" v-model="selectedChartType">
          <option v-for="chartType in chartTypes" :value="chartType">{{ chartType }}</option>
        </select>
      </div>
      <div v-if="chartData!=[]" id="theChart">
        <gchart
        v-if="chartData"
        :type="selectedChartType"
        :data="chartData"
        :options="chartOptions"
        />
      </div>
    </div>

</template>

<script>
import { eventBus } from '../main.js'
import { GChart } from 'vue-google-charts';

export default {
  name: 'Graph',
  components: {
    "gchart": GChart
  },
  data() {
    return{
      fetchedStock: {},
      // multi-lines data sample:
      // chartData: [
      // ['Date',      'AAPL', 'MSFT', 'IBM'],
      // ['2019-01-01', 1000,  400,    200],
      // ['2019-01-02', 1170,  460,    250],
      // ['2019-01-03', 660,   1120,   300],
      // ['2019-01-04', 1030,  540,    350]],

      // single-line data sample:
      chartData: [
      ['Date',      'AAPL'],
      ['2019-02-28', 112.0300],
      ['2019-01-31', 104.4300],
      ['2018-12-31', 101.57],
      ['2018-11-30', 110.89]],
    selectedChartType: 'LineChart',
    chartTypes : ["ColumnChart", "PieChart", "BarChart", "LineChart", "AreaChart", "ScatterChart"],
    chartOptions: {
      title: 'Monthly Time Series',
      width: 1000,
      height: 400,
      is3D: true
    },
  }},
  mounted(){
    this.getStocks();
  },
  methods: {
    getStocks(){
      eventBus.$on('fetch-stock', (stock) => {
        this.fetchedStock = stock;
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
