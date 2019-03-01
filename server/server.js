const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors');

app.use(parser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('sharetracker');
    const bookingsCollection = db.collection('shares');
    const bookingsRouter = createRouter(bookingsCollection);

    const symbolsCollection = db.collection('symbols');
    const symbolsRouter = createRouter(symbolsCollection)

    app.use('/api/shares', bookingsRouter);
    app.use('/api/symbols', symbolsRouter);
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
