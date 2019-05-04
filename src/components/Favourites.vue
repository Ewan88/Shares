<template lang="html">
  <div>
    <table class="favourites">
      <tr>
        <th>Graph?</th>
        <th>Symbol</th>
        <th>Company</th>
        <th>Purchase Date</th>
        <th>Qty</th>
        <th>Bought Price $</th>
        <th>Current Price</th>
        <th>Profit/Loss</th>
        <th>Value</th>
        <th>Delete</th>
      </tr>
      <tr v-for='(fav, index) in favourites' v-bind:key="fav._id">
        <td><input v-on:change="updateElement(fav, 'display', index)" type="checkbox" class="checkbox"  v-bind:key="fav._id" v-model="fav.display" :id="fav._id" :name="fav._id" :checked="fav.display"/></td>
        <td>{{fav.symbol}}</td>
        <td>{{fav.name}}</td>
        <td><input v-on:change="updateElement(fav, 'purchase_date', index)" type="date"  name="fav_date"  :id="fav._id" v-model="fav.purchase_date" :max="todayDate"/></td>
        <td><input v-on:change="updateElement(fav, 'qty', index)" type="number" name="fav_quantity" :id="fav._id" v-model="fav.qty" min="0"/></td>
        <td><input v-on:change="updateElement(fav, 'bought_price', index)" type="number" name="fav_boughtPrice" :id="fav._id" v-model="fav.bought_price" min="0"/></td>
        <td>{{toDollars(fav.latest_price)}}</td>
        <td>{{toDollars(((fav.qty * fav.latest_price)-(fav.qty * fav.bought_price)))}}</td>
        <td>{{toDollars((fav.qty*fav.latest_price))}}</td>
        <td><button v-on:click="deleteFavourite(fav._id, index)">X</button></td>
      </tr>
      <tr>
        <td></td><td></td><td></td><td></td><td></td><td></td>
        <td id="total">Totals:</td>
        <td id="total">{{toDollars(totalDelta)}}</td>
        <td id="total">{{toDollars(totalValue)}}</td>
        <td></td>
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
      todayDate: ""
    }
  },
  computed:{
    totalDelta: function(){
      return this.favourites.reduce((total, fav) => total + ((fav.qty * fav.latest_price)-(fav.qty * fav.bought_price)),0)
    },
    totalValue: function(){
      return this.favourites.reduce((total, fav) => total + (fav.qty * fav.latest_price), 0)
    }
  },
  methods: {
    fetchFavourites(){
      fetch('https://still-gorge-15153.herokuapp.com/api/shares')
      .then(res => res.json())
      .then(favs => this.favourites=favs)
      .then(() => this.emitDisplayFavourites())
    },

    emitDisplayFavourites(){
      let toDisplay=[];
      toDisplay=this.favourites.filter(f=> f.display==true);
      eventBus.$emit("favourites-changed", toDisplay);
    },

    toDollars(value){
      let str=Math.abs(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      if (value < 0){
        str="-$" + str
      } else {
        str= "$" + str
      }
      return str
    },

    updateElement(element, key, index, emit = true){
      let updatedField={};
      if (isNaN(Number(element[key]))){
        updatedField={ [key] : element[key]};
        this.favourites[index][key] = element[key];
      } else {
        updatedField={ [key] : Number(element[key])};
        this.favourites[index][key] = Number(element[key]);
      }
      fetch('https://still-gorge-15153.herokuapp.com/api/shares/'+ element._id, {
        method: 'PUT',
        body: JSON.stringify(updatedField),
        headers: { 'Content-Type': 'application/json'}});
        if (emit) {
          this.emitDisplayFavourites()
        }
      },

      deleteFavourite(id, index){
        this.favourites.splice(index,1);
        fetch('https://still-gorge-15153.herokuapp.com/api/shares/' + id, {
          method: 'DELETE'
        })
        .then(() => this.emitDisplayFavourites())
      },

      addFavourite(equity){
        let newRecord={
          "symbol": equity["Symbol"],
          "name": equity["Name"],
          "qty": 0,
          "display": false,
          "purchase_date": this.todayDate,
          "bought_price": null,
          "latest_price": null
        };
        fetch('https://still-gorge-15153.herokuapp.com/api/shares/', {
          method: 'POST',
          body: JSON.stringify(newRecord),
          headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
          this.favourites.push(res)
          this.emitDisplayFavourites()
        })
      },

      workOutDates: function(){
        let d = new Date();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let yy = d.getFullYear();
        this.todayDate = yy + '-' + mm.toString().padStart(2,'0') + '-' + dd.toString().padStart(2,'0');
      },

      updateSharePrice(newPrice){
        this.favourites.forEach((fav, index) => {
          if (fav.symbol==newPrice.symbol){
            if (fav.bought_price==null){
              this.updateElement({'_id': this.favourites[index]['_id'], 'bought_price': newPrice.value}, 'bought_price', index, false)
            }
            this.updateElement({'_id': this.favourites[index]['_id'], 'latest_price': newPrice.value}, 'latest_price', index, false)
          }
        })
      },
    },
    mounted(){
      this.fetchFavourites();
      this.workOutDates();
      eventBus.$on("favourites-added", (equity) => {
        this.addFavourite(equity)
      });
      eventBus.$on("new-price", (sharePrice) => {
        this.updateSharePrice(sharePrice)
      })
    },
  }
  </script>
