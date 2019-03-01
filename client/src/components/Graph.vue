<template>
  <div id="graph" >

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
      test: [],
      fetchedStock: {},

      chartData: [['Date','']],
      selectedChartType: 'LineChart',
      chartTypes : ["ColumnChart", "PieChart", "BarChart", "LineChart", "AreaChart", "ScatterChart"],
      chartOptions: {
        title: '',
        width: 1000,
        height: 400,
        is3D: true
      },
    },
    mounted(){
      this.getStocks()
    },
    methods: {
      getStocks(){
        eventBus.$on('fetch-stock', (stock) => {
          this.fetchedStock = stock;
          this.chartOptions.title = Object.keys(this.fetchedStock)[1];
          this.chartData[0][1] = this.fetchedStock["Meta Data"]["2. Symbol"];
        });
      },
      getChartData(){
        let timeKey = Object.keys(this.fetchedStock)[1]
        for (let chunk in this.fetchedStock[timeKey]){
          let label=chunk
          let dollarValue = this.fetchedStock[timeKey][chunk]['4. close']
          let element=[label, dollarValue]
          this.chartData.push(element)
        }
      },
    },
  }
  </script>
