use sharetracker;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    qty: 100,
    purchase_date: "2019-01-01",
    display: true,
    bought_price: 0,
    latest_price: 0
  },
  {
    symbol: "IBM",
    name: "International Business Machines",
    qty: 200,
    purchase_date: "2019-01-01",
    display: true,
    bought_price: 0,
    latest_price: 0
  },
  {
    symbol: "SBUX",
    name: "Starbucks Corp.",
    qty: 50,
    purchase_date: "2019-01-01",
    display: false,
    bought_price: 0,
    latest_price: 0
  }
]);
