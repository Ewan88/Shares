<template lang="html">
  <div id="app">
    <search-box/>
    <Favourites/>
    <graph class="graph"/>
  </div>
</template>

<script>
import Graph from "./components/Graph";
import SearchBox from "./components/SearchBox";
import Favourites from "./components/Favourites.vue";
export default {
  name: 'app',
  components: {
    "search-box": SearchBox,
    "Favourites": Favourites,
    "graph": Graph,
  },
}
</script>
