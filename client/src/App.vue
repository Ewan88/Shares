<template lang="html">
  <div id="search-box">
    <form/>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox"
export default {
  name: 'app',
  data() {
    return {
      boookings: []
    }
  }
},
components: {
  SearchBox,
},
mounted(){
  this.fetchPersonal_Stocks();

  eventBus.$on('refresh-data', this.fetchPersonal_Stocks);
},
methods: {
  fetchPersonal_Stocks(){
    
  }
}
</script>
