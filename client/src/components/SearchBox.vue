<template lang="html">
  <form id="search-box" v-on:submit.prevent="getStock">
      <label for="function">Function:</label>
      <input type="text"
             v-model="this.function"
             id="function" required />
      <label for="symbol">Symbol:</label>
      <input type="text"
             v-model="this.symbol"
             id="symbol" required />
      <label for="apikey">APIkey:</label>
      <input type="text"
             v-model="this.apikey"
             id="symbol" required />
      <input type="submit" value="Search" id="search"/>
  </form>
</template>


<script>
import { eventBus } from '../main.js'
export default {
  name: "SearchBox",
  data(){
    return{
      function: '',
      symbol: '',
      apikey: '',
      searchedStock: {},
    }
  },
  methods: {
    fetchStock(){
      fetch(`https://www.alphavantage.co/query?function=${this.function}&symbol=${this.syombol}&apikey=${this.apikey}`)
      .then(res => res.json())
      .then(stock => this.searchedStock = stock)
    };
  }
},
</script>
