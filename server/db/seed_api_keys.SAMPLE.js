use sharetracker;
db.dropDatabase();

db.keys.insertMany([
  {
    apiURL: "https://www.alphavantage.co/query",
    key: "demo",
    description: "Demo Key"
  }
]);
