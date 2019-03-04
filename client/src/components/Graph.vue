<template>
  <div id="graph" v-if="this.chartData.length >= 2">

    <h2 id="heading">Share Tracker</h2>
    <div class="graphSelectorWrapper">
      <label for="chartType">Change Graph Type:</label>
      <select name="chartType" id="chartType" v-model="selectedChartType">
        <option v-for="chartType in chartTypes" :key="chartType" :value="chartType">{{ chartType }}</option>
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
      favourites: [],
      fetchedStock: {},
      currentFavourite: null,
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
    // this.getStocks()
    eventBus.$on('favourites-changed', (newFavourites) => {
      this.getFavourites(newFavourites);

    })
  },
  methods: {
    // fetchSymbol(){
    //   fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.keywords}&apikey=${this.apikey}`)
    //   .then(res => res.json())
    //   .then(symbols => this.fetchedSymbols = symbols);
    // },
    // fetchStock(){
    //   fetch(`https://www.alphavantage.co/query?function=${this.selectedSeries}&symbol=${this.symbol}&apikey=${this.apikey}`)
    //   .then(res => res.json())
    //   .then(stock => this.fetchedStock = stock);
    //
    //   // eventBus.$emit('fetch-stock', this.fetchedStock);
    // }
    getFavourites(newFavourites){
      this.chartData = [['Date']];
      this.favourites = newFavourites;
      let promises = [];
      for (var favourite of this.favourites){
        // this.fetchedStock = {};
        // this.currentFavourite = favourite;
        promises.push(
          fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${favourite.symbol}&apikey=FGJ6YIOA7MKB3P94`)
          .then(res => res.json())
          .then(stock => this.fetchedStock = stock)
          .then(() => this.getStocks(stock, favourite))
          .then(() => this.updateFavourites())
        )
      }
      Promise.all(promises).then(() => {
          this.getTotal();
      })
    },
    updateFavourites(){
      let newValue = {
        symbol: null,
        value: null,
      }
      newValue.symbol = this.fetchedStock["Meta Data"]["2. Symbol"];
      let time_series = Object.keys(this.fetchedStock)[1];
      let date = Object.keys(this.fetchedStock[time_series])[0];
      newValue.value = this.fetchedStock[time_series][date]['4. close'];
      eventBus.$emit('new-price', newValue);
    },
    getStocks(favourite){
      this.chartOptions.title = Object.keys(this.fetchedStock)[1];
      this.chartData[0].push(`${this.fetchedStock["Meta Data"]["2. Symbol"]}: ${favourite.purchase_date}`);
      if (this.chartData[0].length > 2) {
        this.getMultipleChartData(favourite);
      }
      else {
        this.getChartData(favourite);
      }
    },
    getTotal(){
      if (this.favourites.length > 1) {
        for (let i = 0; i < this.chartData.length; i++){
          if (i === 0) {
            this.chartData[i].push('Total');
          }
          else {
            let sum = 0;
            for (let j = 0; j < this.chartData[i].length; j++){
              if (j > 0) {
                sum += this.charData[i][j];
              }
            }
            this.charData[i].push(sum);
          }
        }
      }
    },
    getChartData(favourite){
      let timeKey = Object.keys(this.fetchedStock)[1];
      let arrayStore = [];
      for (let chunk in this.fetchedStock[timeKey]){
        if (chunk >= favourite.purchase_date) {
          let label=chunk;
          let dollarValue = Number(this.fetchedStock[timeKey][chunk]['4. close']) * favourite.qty;
          let element=[label, dollarValue];
          arrayStore.push(element);
        }
      }
      let reversedArray = arrayStore.reverse();
      // debugger;
      for (let closingVal of reversedArray) {
        this.chartData.push(closingVal);
      }
    },
    getMultipleChartData(favourite){
      let timeKey = Object.keys(this.fetchedStock)[1];
      let arrayStoreLabels = [];
      let arrayStoreVals = [];
      for (let chunk in this.fetchedStock[timeKey]){
        if (chunk >= favourite.purchase_date) {
          let label=chunk;
          arrayStoreLabels.push(label);
          let dollarValue = Number(this.fetchedStock[timeKey][chunk]['4. close']) * favourite.qty;
          arrayStoreVals.push(dollarValue);
        }
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
