<template lang="html">
  <div id="search-box" >
    <label for="function">Function:</label>
    <select v-model="selectedSeries" id="time-series">
      <option disabled value=''>
        select a time series
      </option>
      <option v-for="(series, index) in this.timeSeries">
        {{ series }}
      </option>
    </select>
    <label for="symbol">Symbol:</label>
    <input type="text" v-model="this.symbol" id="symbol" @keyup.enter="fetchStock" />
    <label for="apikey">APIkey:</label>
    <input type="text" v-model="this.apikey" id="symbol" @keyup.enter="fetchStock"/>
    <button @click="fetchStock" id="search">
      Search
    </button>
  </div>
</template>


<script>
import { eventBus } from '../main.js'
export default {
  name: "SearchBox",
  data(){
    return{
      timeSeries: ['TIME_SERIES_DAILY', 'TIME_SERIES_WEEKLY', 'TIME_SERIES_MONTHLY'],
      selectedSeries: null,
      symbol: 'MSFT',
      apikey: 'demo',
      fetchedStock: {},
    }
  },
  methods: {
    fetchStock(){
      fetch(`https://www.alphavantage.co/query?function=${this.selectedSeries}&symbol=${this.symbol}&apikey=${this.apikey}`)
      .then(res => res.json())
      .then(stock => this.fetchedStock = stock);

      // eventBus.$emit('fetch-stock', this.fetchedStock);
    }
  },
}
</script>
