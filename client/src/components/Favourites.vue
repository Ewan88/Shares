<template lang="html">
  <div>
    <table>
      <tr>
        <th>Graph?</th>
        <th>Symbol</th>
        <th>Company</th>
        <th>Purchase Date</th>
        <th>Qty</th>
      </tr>
      <tr v-for='fav in favourites'>
        <td><input v-on:change="updateDisplay(fav)" class="checkbox" type="checkbox" :id="fav._id" :name="fav._id" :checked="fav.display"></input></td>
        <td>{{fav.symbol}}</td>
        <td>{{fav.name}}</td>
        <td>{{fav.purchase_date}}</td>
        <td>{{fav.qty}}</td>
      </tr>
    </table>
  </div>

</template>

<script>

import { eventBus } from '../main.js';

export default {
  name: 'Favourites',
  data(){
    return{
      favourites: [],
      data:["hi"]
    }
  },

  methods: {
    fetchFavourites(){
      fetch('http://localhost:3000/api/shares')
      .then(res => res.json())
      .then(favs => this.favourites=favs)
    },
    updateDisplay(element){
      //update the database
      let updatedRecord={
        "symbol": element.symbol,
        "name":element.name,
        "qty":element.qty,
        "display": !element.display,
        "purchase_date": element.purchase_date
      };
      fetch('http://localhost:3000/api/shares/'+ element._id, {
        method: 'PUT',
        body: JSON.stringify(updatedRecord),
        headers: { 'Content-Type': 'application/json'}})
      //update the local favourites object
      let index = this.favourites.findIndex(f => f._id==element._id)
      this.favourites[index].display=!element.display;
      //fire the event that something has changed.
      eventBus.$emit("favourites-changes", this.favourites);
    }
  },
  mounted(){
    this.fetchFavourites();
    // this might crash, may need to check this.favourites is populated
    eventBus.$emit("favourites-changes", this.favourites);
  },
  components: {
  }
}


</script>
