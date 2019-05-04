const express = require('express');
const path = require('path');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./router/create_router.js');
const cors = require('cors');
const publicPath = path.join(__dirname, '../client/public');

app.use(express.static(publicPath));
app.use(parser.json());
app.use(cors());

let url = 'mongodb+srv://User:Password@cluster0-y4ecu.mongodb.net/test?retryWrites=true' || 'mongodb://localhost:27017';
let port = process.env.PORT || 3000;

MongoClient.connect(url, (err, client) => {
  if (err){
    console.log(err);
  }

  const db = client.db('sharetracker');
  const bookingsCollection = db.collection('shares');
  const bookingsRouter = createRouter(bookingsCollection);

  const symbolsCollection = db.collection('symbols');
  const symbolsRouter = createRouter(symbolsCollection)

  app.use('/api/shares', bookingsRouter);
  app.use('/api/symbols', symbolsRouter);

  app.listen(port, function () {
    console.log('Listening on port ' + port);
  })

});
