<template lang="html">
  <div id="search-box" >
    <label>Function:</label>
    <select v-model="selectedSeries" id="time-series">
      <option disabled value=''>
        select a time series
      </option>
      <option v-for="(series, index) in this.timeSeries">
        {{ series }}
      </option>
    </select>
    <label>Symbol:</label>
    <!-- <input type="text" v-model="this.symbol" id="symbol" @keyup.enter="fetchStock" /> -->
    <input type="text" v-model="symbol" placeholder="Search.." @keup.enter="fetchStock" />
    <label>APIkey:</label>
    <input type="text" v-model="apikey" @keyup.enter="fetchStock"/>
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
      symbol: null,
      keywords: null,
      apikey: null,
      fetchedSymbols: {},
      fetchedStock: {},
    }
  },
  methods: {
    fetchSymbol(){
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.keywords}&apikey=${this.apikey}`)
      .then(res => res.json())
      .then(symbols => this.fetchedSymbols = symbols);
    },
    fetchStock(){
      fetch(`https://www.alphavantage.co/query?function=${this.selectedSeries}&symbol=${this.symbol}&apikey=${this.apikey}`)
      .then(res => res.json())
      .then(stock => this.fetchedStock = stock)
      .then(res => eventBus.$emit('fetch-stock', this.fetchedStock));
    }
  },
}
</script>
