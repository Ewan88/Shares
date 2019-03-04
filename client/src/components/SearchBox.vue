<template lang="html">
  <div id="search-box" >
    <Dropdown v-if="allSymbols!=[]"
      id="searchBox"
      :options="symbolsFiltered"
      :disabled="false"
      v-on:selected="selectCompany"
      placeholder="Add Index....">
  </Dropdown>
</div>
</template>

<script>
import { eventBus } from '../main.js';
import Dropdown from 'vue-simple-search-dropdown';

export default {
  name: "SearchBox",
  data(){
    return{
      rawSymbols:[],
      allSymbols: [],
      symbolsFiltered: [],
      lastSelection: ""
    }
  },

  methods: {
    filterSymbol() {
      if (this.allSymbols) {
        this.symbolsFiltered=this.allSymbols.filter((d) => ((d["Name"].toLowerCase().includes(this.search_box.toLowerCase())) || (d["Symbol"].toLowerCase().includes(this.search_box.toLowerCase()))));
      } else {
        this.symbolsFiltered=[];
      }
    },

    formatSymbols(rawSymbols){
      return rawSymbols.map(company => {return {"id": company["Symbol"], "name": (company["Symbol"]+" : "+company["Name"])}})
    },

    selectCompany(selection) {
      if (selection["id"]){
        if (this.lastSelection!=selection){
          const index = this.rawSymbols.findIndex(s => s["Symbol"]==selection["id"])
          const equity= this.rawSymbols[index]
          eventBus.$emit("favourites-added", equity)
          this.lastSelection=selection;
        }
      }
    },

    fetchSymbols(){
      fetch('http://localhost:3000/api/symbols')
      .then(res => res.json())
      .then(res => {
        this.rawSymbols=res
        this.symbolsFiltered=this.allSymbols=this.formatSymbols(res)})
      },
    },

    mounted() {
      this.fetchSymbols();
    },

    components: {
      "Dropdown": Dropdown
    },
  }

  </script>
