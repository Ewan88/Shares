<template>
  <div id="graph" v-if="this.chartData.length >= 2">

    <h2 id="heading">Share Tracker</h2>
    <div class="graphSelectorWrapper">
      <label for="chartType">Change Graph Type:</label>
      <select name="chartType" id="chartType" v-model="selectedChartType">
        <option v-for="chartType in chartTypes" :value="chartType">{{ chartType }}</option>
      </select>
    </div>
    <div id="deleteTestWrapper">
      <label for="deleteTest">Delete a Stock:</label>
      <select name="deleteTest" id="deleteTest" v-model="selectedData" v-on:change="deleteChartData(selectedData)">
        <option v-for="(data, index) in chartData[0]" :value="index" :index="index">
          {{ data }} - {{ index }}
        </option>
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
      // ["2019-03-02", null, 1000],
      // ["2019-03-01", 1000, 900],
      // ["2019-02-28", 1170, 890],
      // ["2019-02-27", 660, 910],
      // ["2019-02-26", 1030, 780]
      // ],
      chartData: [['Date']],
      selectedData: null,
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
        }
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
      }
      let reversedArray = arrayStore.reverse();
      for (let closingVal of reversedArray) {
        this.chartData.push(closingVal);
      }
    },
    getMultipleChartData(){
      let timeKey = Object.keys(this.fetchedStock)[1];
      let arrayStoreLabels = [];
      let arrayStoreVals = [];
      for (let chunk in this.fetchedStock[timeKey]){
        let label=chunk;
        arrayStoreLabels.push(label)
        let dollarValue = Number(this.fetchedStock[timeKey][chunk]['4. close']);
        arrayStoreVals.push(dollarValue);
      }
      let reversedLabels = arrayStoreLabels.reverse();
      let reversedVals = arrayStoreVals.reverse();
      if (this.chartData.length >= reversedVals.length) {
        let loopStart = (this.chartData.length - reversedVals.length);
        for (let i = 0; i < this.chartData.length; i++) {
          if (i > 0 && i < loopStart) {
            this.chartData[i].push(null);
          }
        }
        let j = 0;
        for (let i = loopStart; i < this.chartData.length; i++) {
          this.chartData[i].push(reversedVals[j]);
          j++;
        }
      }
      else {
        let loopEnd = (reversedVals.length - this.chartData.length);
        let i = 0;
        for (i; i < loopEnd; i++) {
          if (i > 0) {
            let newArray = [reversedLabels[i], reversedVals[i]]
            for (let j = 0; j < (this.chartData[0].length - 2); j++) {
              newArray.splice(1, 0, null);
            }
            this.chartData.splice(i, 0, newArray);
          }
        }
        let j = 0;
        for (i = loopEnd; i < this.chartData.length; i++) {
          this.chartData[i].push(reversedVals[j]);
          j++;
        }
      }
    },
    deleteChartData(index){
      if (this.chartData[0].length === 2) {
        this.chartData = [];
        this.chartData.push(['Date']);
      } else {
        for (let i = 0; i < this.chartData.length; i++) {
          this.chartData[i].splice(index, 1);
        }
      }
    },
  },
};
</script>
