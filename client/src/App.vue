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

    }
  }
},
components: {
  "search-box": SearchBox,
},
mounted(){
  eventBus.$on('get-stock', (stock) => {
    this.Stock = stock;
  });
},
methods: {
}
</script>
