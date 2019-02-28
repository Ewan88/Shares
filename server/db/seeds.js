use sharetracker;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: "AAPL",
    qty: 100,
    purchase_date: "2019-01-01",
  }
]);
