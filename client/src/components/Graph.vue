<template>
  <div id="graph" v-if="this.chartData.length >= 2">

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
      chartData: [     ['Date']    ],
      //
      // ['Date', 'AAPL', 'TSLA'],
      //
      // ["2019-03-02", 1000],
      // ["2019-03-01", 1000, 900],
      // ["2019-02-28", 1170],
      // ["2019-02-27", 660],
      // ["2019-02-26", 1030]




      selectedChartType: 'LineChart',
      chartTypes : ["ColumnChart", "PieChart", "BarChart", "LineChart", "AreaChart", "ScatterChart"],
      chartOptions: {
        title: '',
        width: 1000,
        height: 400,
        is3D: true
      },
    };
  },
  mounted(){
    this.getStocks()
  },
  methods: {
    getStocks(){
      eventBus.$on('fetch-stock', (stock) => {
        this.fetchedStock = stock;
        this.chartOptions.title = Object.keys(this.fetchedStock)[1];



        this.chartData[0].push(this.fetchedStock["Meta Data"]["2. Symbol"]);

        this.getChartData()
      });
    },
    getChartData(){
      let timeKey = Object.keys(this.fetchedStock)[1]
      let arrayStore = []
      for (let chunk in this.fetchedStock[timeKey]){
        let label=chunk
        let dollarValue = Number(this.fetchedStock[timeKey][chunk]['4. close'])
        let element=[label, dollarValue]
        arrayStore.push(element)
      }
      let array = arrayStore.reverse()
      for (let thing of array) {
        this.chartData.push(thing)
      }

      // this.chartData.push(arrayStore.reverse())
    },
  },
}
</script>
