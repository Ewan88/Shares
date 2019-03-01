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
        <td><input class="checkbox" type="checkbox" :id="fav._id" :name="fav._id" :checked="fav.display"></input></td>
        <td>{{fav.symbol}}</td>
        <td>{{fav.name}}</td>
        <td>{{fav.purchase_date}}</td>
        <td>{{fav.qty}}</td>
      </tr>
    </table>
  </div>

</template>

<script>


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
    }
  },
  mounted(){
    this.fetchFavourites();
  },
  components: {
  }
}


</script>
