<template>
  <div id="graph" v-if="this.chartData.length >= 2">
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
      favourites: [],
      key: "V1X9PH3SZXO178OO",
      keyIndex: 0,
      fetchedStock: {},
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
  methods: {
    getFavourites(newFavourites){
      if (this.favourites.length < newFavourites.length) {
        var res = newFavourites.filter(item1 =>
          !this.favourites.some(item2 => (item2.symbol === item1.symbol && item2.purchase_date === item1.purchase_date)))

        for (let i = 0; i < res.length; i++){
          fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${res[i].symbol}&apikey=${this.key}`)
          .then(res => res.json())
          .then(stock => this.fetchedStock = stock)
          .then(() => this.getStocks(res[i]))
          .then(() => this.updateFavourites())
          .then(() => this.getTotal())
        }
        this.favourites = newFavourites;
      } else {
        var filteredStocks = this.favourites.filter(item1 =>
          !newFavourites.some(item2 => (item2.symbol === item1.symbol && item2.purchase_date === item1.purchase_date)))
          if (filteredStocks.length) {
            for (var i = 0; i < this.chartData[0].length; i++) {
              if (`${filteredStocks[0].symbol}: ${filteredStocks[0].purchase_date}` === this.chartData[0][i]) {
                this.deleteChartData(i);
              }
            }
          }
          this.favourites = newFavourites;
          this.deleteChartData(this.favourites.length + 1)
          if (this.favourites.length > 1) {
            this.getTotal();
          }
          if (this.favourites.length === 1) {
            this.deleteChartData(2);
          }
        }
      },

      updateFavourites(){
        let newValue = {
          symbol: null,
          start: null,
          end: null
        }
        newValue.symbol = this.fetchedStock["Meta Data"]["2. Symbol"];
        let time_series = Object.keys(this.fetchedStock)[1];
        let startDate = Object.keys(this.fetchedStock[time_series])[0];
        newValue.start = this.fetchedStock[time_series][startDate]['4. close'];
        let endDate = Object.keys(this.fetchedStock[time_series]).pop();
        newValue.end = this.fetchedStock[time_series][endDate]['4. close'];
        eventBus.$emit('new-price', newValue);
      },

      getStocks(favourite){
        if (this.chartData[0].length > 2) {
          this.deleteChartData(this.chartData[0].length - 1);
        }
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
        if ((this.favourites.length === this.chartData[0].length - 1)&&(this.favourites.length > 1)) {
          for (let i = 0; i < this.chartData.length; i++){
            if (i === 0) {
              this.chartData[0].push('Total');
            }
            else {
              let sum = 0;
              for (let j = 1; j < this.chartData[i].length; j++){
                sum += this.chartData[i][j];
              }
              this.chartData[i].push(sum);
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
            let dollarValue = Number((Number(this.fetchedStock[timeKey][chunk]['4. close']) * favourite.qty).toFixed(2));
            let element=[label, dollarValue];
            arrayStore.push(element);
          }
        }
        let reversedArray = arrayStore.reverse();
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
            let dollarValue = Number((Number(this.fetchedStock[timeKey][chunk]['4. close']) * favourite.qty).toFixed(2));
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
        if (this.chartData[0].length < 2) {
          this.chartData = [['Date']];
        }
        else {
          for (let i = 0; i < this.chartData.length; i++) {
            this.chartData[i].splice(index, 1);
          }
        }
      },
    },
    mounted(){
      eventBus.$on('favourites-changed', (newFavourites) => {this.getFavourites(newFavourites);})
    },
  };
  </script>
