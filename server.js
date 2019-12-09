const express = require('express');
const app = express();
const db = require('./db/index.js');
const dotenv = require('dotenv');
const cors = require('cors');

//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const requestRoute = require('./routes/request');

dotenv.config();

var port = process.env.PORT || 8080

//Connect to DB
if(process.env.NODE_ENV !== 'test')
    db.connect();

//Use Middlewares
app.use(express.json()); //Body-parser
app.use(cors());

//Route Middlewares - where the user will navigate
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);
app.use('/api/request', requestRoute);

app.listen(port, () => {
    console.log('Server Up and running!');
});

module.exports = app;