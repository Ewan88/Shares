use sharetracker;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: "AAPL",
    name: "Apple",
    qty: 100,
    purchase_date: "2019-01-01",
    display: true
  },
  {
    symbol: "IBM",
    name:"IBM",
    qty: 200,
    purchase_date: "2019-01-01",
    display: true
  },
  {
    symbol: "SBUX",
    name:"Starbuck",
    qty: 50,
    purchase_date: "2019-01-01",
    display: true
  }
]);
