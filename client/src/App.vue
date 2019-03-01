<template lang="html">
  <div id="app">
    <search-box/>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox";
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
