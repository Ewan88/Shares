<template lang="html">
  <div>
    <table>
      <tr>
        <th>Graph?</th>
        <th>Symbol</th>
        <th>Company</th>
        <th>Purchase Date</th>
        <th>Qty</th>
        <th>Bought Price</th>
        <th>Current Price</th>
        <td>Delta</td>
        <td>Value</td>
        <th>Delete</th>
      </tr>
      <tr v-for='(fav,i) in favourites' v-bind:key="fav">
        <td><input v-on:change="updateDisplay(fav)" class="checkbox" type="checkbox" v-bind:key="i" :id="fav._id" :name="fav._id" :checked="fav.display"/></td>
        <td>{{fav.symbol}}</td>
        <td>{{fav.name}}</td>
        <td><input v-on:change="updateDate(fav)" type="date"  name="fav_date"     :id="fav._id" v-model="fav.purchase_date" :max="todayDate"/>  </td>
        <td><input v-on:change="updateQty(fav)" type="number" name="fav_quantity" :id="fav._id" v-model="fav.qty" min="0" /></td>
        <td>{{fav.bought_price}}</td>
        <td>{{fav.latest_price}}</td>
        <td>delta</td>
        <td>value</td>
        <td><button v-on:click="deleteFavourite(fav._id)">X</button></td>
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

  methods: {
    fetchFavourites(){
      fetch('http://localhost:3000/api/shares')
      .then(res => res.json())
      .then(favs => this.favourites=favs)
      .then(() => this.emitDisplayFavourites())
    },

    emitDisplayFavourites(){
      let toDisplay=[];
      toDisplay=this.favourites.filter(f=> f.display==true);
      eventBus.$emit("favourites-changed", toDisplay);
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
        this.emitDisplayFavourites();
      },

      updateQty(element){
        //update the database
        let index = this.favourites.findIndex(f => f._id == element._id);
        let oldRecord = this.favourites[index]
        let updatedRecord={
          "symbol": oldRecord.symbol,
          "name": oldRecord.name,
          "qty": element.qty,
          "display": oldRecord.display,
          "purchase_date": oldRecord.purchase_date
        };
        fetch('http://localhost:3000/api/shares/'+ element._id, {
          method: 'PUT',
          body: JSON.stringify(updatedRecord),
          headers: { 'Content-Type': 'application/json'}})
          //update the local favourites object
          this.favourites[index].qty=element.qty;
          //fire the event that something has changed.
          this.emitDisplayFavourites();
        },

        updateDate(element){
          //update the database
          let index = this.favourites.findIndex(f => f._id == element._id);
          let oldRecord = this.favourites[index]
          let updatedRecord={
            "symbol": oldRecord.symbol,
            "name": oldRecord.name,
            "qty": oldRecord.qty,
            "display": oldRecord.display,
            "purchase_date": element.purchase_date
          };
          fetch('http://localhost:3000/api/shares/'+ element._id, {
            method: 'PUT',
            body: JSON.stringify(updatedRecord),
            headers: { 'Content-Type': 'application/json'}})
            //update the local favourites object
            this.favourites[index].purchase_date=element.purchase_date;
            //fire the event that something has changed.
            this.emitDisplayFavourites();
          },

          deleteFavourite(id){
            const index=this.favourites.findIndex(f => f._id==id);
            this.favourites.splice(index,1);
            fetch('http://localhost:3000/api/shares/' + id, {
              method: 'DELETE'
            })
            .then(() => this.emitDisplayFavourites())
          },

          addFavourite(equity){
            let newRecord={
              "symbol": equity["Symbol"],
              "name": equity["Name"],
              "qty": 0,
              "display": true,
              "purchase_date": this.todayDate,
              "bought_price": null,
              "latest_price": null
            };

            fetch('http://localhost:3000/api/shares/', {
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
            // 2019-02-18
            // var myDateString = yy + '-' + mm + '-' + dd;
            this.todayDate = yy + '-' + mm.toString().padStart(2,'0') + '-' + dd.toString().padStart(2,'0');
          },

          updateSharePrice(newPrice){
            this.favourites.forEach((fav, index) => {
              if (fav.symbol==newPrice.symbol){
                if (fav.bought_price==null){
                  this.favourites[index]["bought_price"]=newPrice.value;
                }
                this.favourites[index]["latest_price"]=newPrice.value;
                let updatedRecord={
                  "bought_price": this.favourites[index].bought_price,
                  "latest_price": this.favourites[index].latest_price
                }
                fetch('http://localhost:3000/api/shares/'+ this.favourites[index]._id, {
                  method: 'PUT',
                  body: JSON.stringify(updatedRecord),
                  headers: { 'Content-Type': 'application/json'}})
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

          components: {
          }
        }


        </script>
