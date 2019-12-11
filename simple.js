const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { MongoMemoryServer } = require('mongodb-memory-server');
const requestRouter = require('./routes/request');

var port = process.env.PORT || 3001
app.use(express.json());
app.use('/api/request',requestRouter);

app.route('/')
    .get((req,res) => {
        res.send('Hello');
    });

let mongoms = new MongoMemoryServer();

const uri = mongoms.getConnectionString();
console.log(uri);
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to local db'))
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log('Server started!');
})

module.exports = app;