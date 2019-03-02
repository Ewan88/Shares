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
import { eventBus } from '../main.js';
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
      //   chartData: [
      // ['Date', 'AAPL', 'TSLA'],
      // ["2019-03-02", 1, 1000],
      // ["2019-03-01", 1000, 900],
      // ["2019-02-28", 1170, 890],
      // ["2019-02-27", 660, 910],
      // ["2019-02-26", 1030, 780]
      // ],
      chartData: [['Date']],
      selectedChartType: 'LineChart',
      chartTypes : ["ColumnChart", "PieChart", "BarChart", "LineChart", "AreaChart", "ScatterChart"],
      chartOptions: {
        title: '',
        width: 1000,
        height: 400,
        is3D: true,
        interpolateNulls: true
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
        // debugger;
        if (this.chartData[0].length > 2) {
          this.getMultipleChartData();
        }
        else {
          this.getChartData();
        };
      });
    },
    getChartData(){
      let timeKey = Object.keys(this.fetchedStock)[1];
      let arrayStore = [];
      for (let chunk in this.fetchedStock[timeKey]){
        let label=chunk;
        let dollarValue = Number(this.fetchedStock[timeKey][chunk]['4. close']);
        let element=[label, dollarValue];
        arrayStore.push(element);
      };
      let reversedArray = arrayStore.reverse();
      for (let closingVal of reversedArray) {
        this.chartData.push(closingVal);
      };
    },
    getMultipleChartData(){
      let timeKey = Object.keys(this.fetchedStock)[1];
      let arrayStoreLables = [];
      let arrayStoreVals = [];
      for (let chunk in this.fetchedStock[timeKey]){
        let label=chunk;
        arrayStoreLables.push(label)
        let dollarValue = Number(this.fetchedStock[timeKey][chunk]['4. close']);
        arrayStoreVals.push(dollarValue);
      };
      let reversedLables = arrayStoreLables.reverse();
      let reversedVals = arrayStoreVals.reverse();
      let loopCount = 0;

      if ((this.chartData.length - 1) >= reversedVals.length) {
         loopCount = this.chartData.length;
      } else {
        loopCount = reversedVals.length;
      };

      let i = ((this.chartData.length - 1) - reversedVals.length);


      for (let j = 1; j < i; j++) {
        this.chartData[j].push(0);
      };
      let j = 0;
      debugger;
      for (i; i < (loopCount - i); i++) {
        j++;
        if (i > 0) {
          console.log(`chartData: ${this.chartData[i][0]}`);
          console.log(`labels: ${reversedLables[j - 1]}`);
          if (this.chartData[i][0] === reversedLables[j - 1]) {
            // debugger;
            this.chartData[i].push(reversedVals[j - 1]);
          } else {
            this.chartData[i].push(0);
          };
        };
      };
    },
  },
};
</script>
