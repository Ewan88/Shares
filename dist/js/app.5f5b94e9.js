(function(t){function e(e){for(var r,o,s=e[0],h=e[1],l=e[2],u=0,d=[];u<s.length;u++)o=s[u],i[o]&&d.push(i[o][0]),i[o]=0;for(r in h)Object.prototype.hasOwnProperty.call(h,r)&&(t[r]=h[r]);c&&c(e);while(d.length)d.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,s=1;s<a.length;s++){var h=a[s];0!==i[h]&&(r=!1)}r&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var r={},i={app:0},n=[];function o(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=r,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(a,r,function(e){return t[e]}.bind(null,r));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],h=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var c=h;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("search-box"),a("Favourites"),a("graph",{staticClass:"graph"})],1)},n=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return this.chartData.length>=2?a("div",{attrs:{id:"graph"}},[t.chartData!=[]?a("div",{attrs:{id:"theChart"}},[t.chartData?a("gchart",{attrs:{type:t.selectedChartType,data:t.chartData,options:t.chartOptions}}):t._e()],1):t._e()]):t._e()},s=[],h=(a("ac4d"),a("8a81"),a("c5f6"),a("ac6a"),a("456d"),a("cb43")),l={name:"Graph",components:{gchart:h["GChart"]},data:function(){return{favourites:[],key:"V1X9PH3SZXO178OO",keyIndex:0,fetchedStock:{},chartData:[["Date"]],selectedData:null,selectedChartType:"LineChart",chartTypes:["ColumnChart","PieChart","BarChart","LineChart","AreaChart","ScatterChart"],chartOptions:{title:"",width:1e3,height:400,is3D:!0,interpolateNulls:!0}}},methods:{getFavourites:function(t){var e=this;if(this.favourites.length<t.length){for(var a=t.filter(function(t){return!e.favourites.some(function(e){return e.symbol===t.symbol&&e.purchase_date===t.purchase_date})}),r=function(t){fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".concat(a[t].symbol,"&apikey=").concat(e.key)).then(function(t){return t.json()}).then(function(t){return e.fetchedStock=t}).then(function(){return e.getStocks(a[t])}).then(function(){return e.updateFavourites()}).then(function(){return e.getTotal()})},i=0;i<a.length;i++)r(i);this.favourites=t}else{var n=this.favourites.filter(function(e){return!t.some(function(t){return t.symbol===e.symbol&&t.purchase_date===e.purchase_date})});if(n.length)for(var o=0;o<this.chartData[0].length;o++)"".concat(n[0].symbol,": ").concat(n[0].purchase_date)===this.chartData[0][o]&&this.deleteChartData(o);this.favourites=t,this.deleteChartData(this.favourites.length+1),this.favourites.length>1&&this.getTotal(),1===this.favourites.length&&this.deleteChartData(2)}},updateFavourites:function(){var t={symbol:null,start:null,end:null};t.symbol=this.fetchedStock["Meta Data"]["2. Symbol"];var e=Object.keys(this.fetchedStock)[1],a=Object.keys(this.fetchedStock[e])[0];t.start=this.fetchedStock[e][a]["4. close"];var r=Object.keys(this.fetchedStock[e]).pop();t.end=this.fetchedStock[e][r]["4. close"],E.$emit("new-price",t)},getStocks:function(t){this.chartData[0].length>2&&this.deleteChartData(this.chartData[0].length-1),this.chartOptions.title=Object.keys(this.fetchedStock)[1],this.chartData[0].push("".concat(this.fetchedStock["Meta Data"]["2. Symbol"],": ").concat(t.purchase_date)),this.chartData[0].length>2?this.getMultipleChartData(t):this.getChartData(t)},getTotal:function(){if(this.favourites.length===this.chartData[0].length-1&&this.favourites.length>1)for(var t=0;t<this.chartData.length;t++)if(0===t)this.chartData[0].push("Total");else{for(var e=0,a=1;a<this.chartData[t].length;a++)e+=this.chartData[t][a];this.chartData[t].push(e)}},getChartData:function(t){var e=Object.keys(this.fetchedStock)[1],a=[];for(var r in this.fetchedStock[e])if(r>=t.purchase_date){var i=r,n=Number((Number(this.fetchedStock[e][r]["4. close"])*t.qty).toFixed(2)),o=[i,n];a.push(o)}var s=a.reverse(),h=!0,l=!1,c=void 0;try{for(var u,d=s[Symbol.iterator]();!(h=(u=d.next()).done);h=!0){var f=u.value;this.chartData.push(f)}}catch(p){l=!0,c=p}finally{try{h||null==d.return||d.return()}finally{if(l)throw c}}},getMultipleChartData:function(t){var e=Object.keys(this.fetchedStock)[1],a=[],r=[];for(var i in this.fetchedStock[e])if(i>=t.purchase_date){var n=i;a.push(n);var o=Number((Number(this.fetchedStock[e][i]["4. close"])*t.qty).toFixed(2));r.push(o)}var s=a.reverse(),h=r.reverse();if(this.chartData.length>=h.length){for(var l=this.chartData.length-h.length,c=0;c<this.chartData.length;c++)c>0&&c<l&&this.chartData[c].push(null);for(var u=0,d=l;d<this.chartData.length;d++)this.chartData[d].push(h[u]),u++}else{var f=h.length-this.chartData.length,p=0;for(p;p<f;p++)if(p>0){for(var v=[s[p],h[p]],m=0;m<this.chartData[0].length-2;m++)v.splice(1,0,null);this.chartData.splice(p,0,v)}var y=0;for(p=f;p<this.chartData.length;p++)this.chartData[p].push(h[y]),y++}},deleteChartData:function(t){if(this.chartData[0].length<2)this.chartData=[["Date"]];else for(var e=0;e<this.chartData.length;e++)this.chartData[e].splice(t,1)}},mounted:function(){var t=this;E.$on("favourites-changed",function(e){t.getFavourites(e)})}},c=l,u=a("2877"),d=Object(u["a"])(c,o,s,!1,null,null,null),f=d.exports,p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"search-box"}},[r("img",{attrs:{src:a("5b62"),alt:""}}),t.allSymbols!=[]?r("Dropdown",{attrs:{id:"searchBox",options:t.symbolsFiltered,disabled:!1,placeholder:"Add Index...."},on:{selected:t.selectCompany}}):t._e()],1)},v=[],m=(a("20d6"),a("6762"),a("2fdb"),a("ae2e")),y=a.n(m),b={name:"SearchBox",data:function(){return{rawSymbols:[],allSymbols:[],symbolsFiltered:[],lastSelection:""}},methods:{filterSymbol:function(){var t=this;this.allSymbols?this.symbolsFiltered=this.allSymbols.filter(function(e){return e["Name"].toLowerCase().includes(t.search_box.toLowerCase())||e["Symbol"].toLowerCase().includes(t.search_box.toLowerCase())}):this.symbolsFiltered=[]},formatSymbols:function(t){return t.map(function(t){return{id:t["Symbol"],name:t["Symbol"]+" : "+t["Name"]}})},selectCompany:function(t){if(t["id"]&&this.lastSelection!=t){var e=this.rawSymbols.findIndex(function(e){return e["Symbol"]==t["id"]}),a=this.rawSymbols[e];E.$emit("favourites-added",a),this.lastSelection=t}},fetchSymbols:function(){var t=this;fetch("https://still-gorge-15153.herokuapp.com/api/symbols").then(function(t){return t.json()}).then(function(e){t.rawSymbols=e,t.symbolsFiltered=t.allSymbols=t.formatSymbols(e)})}},mounted:function(){this.fetchSymbols()},components:{Dropdown:y.a}},g=b,_=Object(u["a"])(g,p,v,!1,null,null,null),D=_.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("table",{staticClass:"favourites"},[t._m(0),t._l(t.favourites,function(e,r){return a("tr",{key:e._id},[a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.display,expression:"fav.display"}],key:e._id,staticClass:"checkbox",attrs:{type:"checkbox",id:e._id,name:e._id},domProps:{checked:e.display,checked:Array.isArray(e.display)?t._i(e.display,null)>-1:e.display},on:{change:[function(a){var r=e.display,i=a.target,n=!!i.checked;if(Array.isArray(r)){var o=null,s=t._i(r,o);i.checked?s<0&&t.$set(e,"display",r.concat([o])):s>-1&&t.$set(e,"display",r.slice(0,s).concat(r.slice(s+1)))}else t.$set(e,"display",n)},function(a){return t.updateElement(e,"display",r)}]}})]),a("td",[t._v(t._s(e.symbol))]),a("td",[t._v(t._s(e.name))]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.purchase_date,expression:"fav.purchase_date"}],attrs:{disabled:1==e.display,type:"date",name:"fav_date",id:e._id,max:t.todayDate},domProps:{value:e.purchase_date},on:{change:function(a){return t.updateElement(e,"purchase_date",r)},input:function(a){a.target.composing||t.$set(e,"purchase_date",a.target.value)}}})]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.qty,expression:"fav.qty"}],attrs:{disabled:1==e.display,type:"number",name:"fav_quantity",id:e._id,min:"0"},domProps:{value:e.qty},on:{change:function(a){return t.updateElement(e,"qty",r)},input:function(a){a.target.composing||t.$set(e,"qty",a.target.value)}}})]),a("td",[t._v(t._s(t.toDollars(e.bought_price)))]),a("td",[t._v(t._s(t.toDollars(e.latest_price)))]),a("td",[t._v(t._s(t.toDollars(e.qty*e.latest_price-e.qty*e.bought_price)))]),a("td",[t._v(t._s(t.toDollars(e.qty*e.latest_price)))]),a("td",[a("button",{on:{click:function(a){return t.deleteFavourite(e._id,r)}}},[t._v("X")])])])}),a("tr",[a("td"),a("td"),a("td"),a("td"),a("td"),a("td"),a("td",{attrs:{id:"total"}},[t._v("Totals:")]),a("td",{attrs:{id:"total"}},[t._v(t._s(t.toDollars(t.totalDelta)))]),a("td",{attrs:{id:"total"}},[t._v(t._s(t.toDollars(t.totalValue)))]),a("td")])],2)])},k=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[t._v("Graph?")]),a("th",[t._v("Symbol")]),a("th",[t._v("Company")]),a("th",[t._v("Purchase Date")]),a("th",[t._v("Qty")]),a("th",[t._v("Bought Price $")]),a("th",[t._v("Current Price")]),a("th",[t._v("Profit/Loss")]),a("th",[t._v("Value")]),a("th",[t._v("Delete")])])}],w=(a("6b54"),a("f576"),a("bd86")),C=(a("a481"),{name:"Favourites",data:function(){return{favourites:[],todayDate:""}},computed:{totalDelta:{get:function(){return this.favourites.reduce(function(t,e){return t+(e.qty*e.latest_price-e.qty*e.bought_price)},0)},set:function(t){return this.totalDelta-t}},totalValue:{get:function(){return this.favourites.reduce(function(t,e){return t+e.qty*e.latest_price},0)},set:function(t){return this.totalValue-t}}},methods:{fetchFavourites:function(){var t=this;fetch("https://still-gorge-15153.herokuapp.com/api/shares").then(function(t){return t.json()}).then(function(e){return t.favourites=e}).then(function(){return t.emitDisplayFavourites()})},emitDisplayFavourites:function(){var t=[];t=this.favourites.filter(function(t){return 1==t.display}),E.$emit("favourites-changed",t)},toDollars:function(t){var e=Math.abs(t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,");return e=t<0?"-$"+e:"$"+e,e},updateElement:function(t,e,a){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i={};isNaN(Number(t[e]))?(i=Object(w["a"])({},e,t[e]),this.favourites[a][e]=t[e]):(i=Object(w["a"])({},e,Number(t[e])),this.favourites[a][e]=Number(t[e])),fetch("https://still-gorge-15153.herokuapp.com/api/shares/"+t._id,{method:"PUT",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}),r&&this.emitDisplayFavourites()},deleteFavourite:function(t,e){var a=this;this.totalDelta,this.favourites[e].qty,this.favourites[e].latest_price,this.favourites[e].qty,this.favourites[e].bought_price,this.totalValue,this.favourites[e].qty,this.favourites[e].latest_price,this.favourites.splice(e,1),fetch("https://still-gorge-15153.herokuapp.com/api/shares/"+t,{method:"DELETE"}).then(function(){return a.emitDisplayFavourites()})},addFavourite:function(t){var e=this,a={symbol:t["Symbol"],name:t["Name"],qty:0,display:!1,purchase_date:this.todayDate,bought_price:null,latest_price:null};fetch("https://still-gorge-15153.herokuapp.com/api/shares/",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then(function(t){return t.json()}).then(function(t){e.favourites.push(t),e.emitDisplayFavourites()})},workOutDates:function(){var t=new Date,e=t.getMonth()+1,a=t.getDate(),r=t.getFullYear();this.todayDate=r+"-"+e.toString().padStart(2,"0")+"-"+a.toString().padStart(2,"0")},updateSharePrice:function(t){var e=this;this.favourites.forEach(function(a,r){a.symbol==t.symbol&&(a.bought_price!=t.start&&null!=a.bought_price||e.updateElement({_id:e.favourites[r]["_id"],bought_price:t.start},"bought_price",r,!1),e.updateElement({_id:e.favourites[r]["_id"],latest_price:t.end},"latest_price",r,!1))})}},mounted:function(){var t=this;this.fetchFavourites(),this.workOutDates(),E.$on("favourites-added",function(e){t.addFavourite(e)}),E.$on("new-price",function(e){t.updateSharePrice(e)})}}),O=C,x=Object(u["a"])(O,S,k,!1,null,null,null),F=x.exports,j={name:"app",components:{"search-box":D,Favourites:F,graph:f}},$=j,q=Object(u["a"])($,i,n,!1,null,null,null),P=q.exports;a.d(e,"eventBus",function(){return E});var E=new r["a"];r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(P)}}).$mount("#app")},"5b62":function(t,e,a){t.exports=a.p+"img/logo.18be6f75.png"}});
//# sourceMappingURL=app.5f5b94e9.js.map