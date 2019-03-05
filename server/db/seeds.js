use sharetracker;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    qty: 100,
    purchase_date: "2019-01-10",
    display: false,
    bought_price: null,
    latest_price: null
  },
  {
    symbol: "IBM",
    name: "International Business Machines",
    qty: 200,
    purchase_date: "2019-02-06",
    display: false,
    bought_price: null,
    latest_price: null
  },
  {
    symbol: "SBUX",
    name: "Starbucks Corp.",
    qty: 50,
    purchase_date: "2019-02-20",
    display: false,
    bought_price: null,
    latest_price: null
  }
]);
