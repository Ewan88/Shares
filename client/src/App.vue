<template lang="html">
  <div id="app">
    <search-box/>
    <Favourites/>
  </div>
</template>

<script>

import SearchBox from "./components/SearchBox";
import Favourites from "./components/Favourites.vue";

import { eventBus } from './main.js';
export default {
  name: 'app',
  data() {
    return {
      fetchedStock: {},
    };
  },
  components: {
    "search-box": SearchBox,
    "Favourites": Favourites
  },
  mounted(){
    // this.getStocks();
  },
  methods: {
    // getStocks(){
    //
    //
    //   eventBus.$on('fetch-stock', (stock) => {
    //     this.fetchedStock = stock;
    //   });
    // }
  }
}
</script>
