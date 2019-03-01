<template lang="html">
  <div id="search-box" >

    <label>Function:</label>
    <select v-model="selectedSeries" id="time-series">
      <option disabled value=''>
        select a time series
      </option>
      <option v-for="series in timeSeries" :key="series">
        {{ series }}
      </option>
    </select>

    <Dropdown v-if="allSymbols!=[]"
      :options="symbolsFiltered"
      :disabled="false"
      v-on:selected="selectCompany"
      placeholder="Company Search....">
    </Dropdown>

    <!-- <label>APIkey:</label>
    <input type="text" v-model="apikey" @keyup.enter="fetchStock"/>
    <button @click="fetchStock" id="search">
      Search
    </button> -->
  </div>
</template>

<script>
// import { eventBus } from '../main.js'
import Dropdown from 'vue-simple-search-dropdown';

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

      // search_box: "",
      allSymbols: [],
      symbolsFiltered: []
    }
  },

  methods: {
    //used for the search box
    filterSymbol() {
      if (this.allSymbols) {
        this.symbolsFiltered=this.allSymbols;
        this.symbolsFiltered=this.symbolsFiltered.filter((d) => ((d["Name"].toLowerCase().includes(this.search_box.toLowerCase())) || (d["Symbol"].toLowerCase().includes(this.search_box.toLowerCase()))));
      } else {
        this.symbolsFiltered=[];
      }
    },
    formatSymbols(rawSymbols){
      let options=[];
      for (let company of rawSymbols){
        options.push({"id": company["Symbol"], "name": (company["Symbol"]+" : "+company["Name"])})
      }
      return options;
    },
    selectCompany(selection) {
      if (selection){
        this.symbol=selection["id"]
      }
    },
    fetchSymbols(){
      fetch('http://localhost:3000/api/symbols')
      .then(res => res.json())
      .then(res => this.symbolsFiltered=this.allSymbols=this.formatSymbols(res))
      // .catch((error) => console.log('Request failed', error))
    },
    // end of search box functions

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
  },
  mounted() {
    this.fetchSymbols();
  },
  components: {
    "Dropdown": Dropdown
  },
}
</script>
