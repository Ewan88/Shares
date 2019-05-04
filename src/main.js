import Vue from 'vue'
import App from './App.vue'
// const cors = require("cors");

// app.use(cors());

export const eventBus = new Vue();


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
