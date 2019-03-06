use sharetracker;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    qty: 10,
    purchase_date: "2019-01-23",
    display: false,
    bought_price: 170,
    latest_price: null
  },
  {
    symbol: "IBM",
    name: "International Business Machines",
    qty: 10,
    purchase_date: "2019-02-01",
    display: false,
    bought_price: 130,
    latest_price: null
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    qty: 10,
    purchase_date: "2019-01-07",
    display: false,
    bought_price: 120,
    latest_price: null
  }
]);
