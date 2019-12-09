const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connect() {
    mongoose.connect(
        process.env.MONGO_URI,
        { 
            useNewUrlParser : true,
            useUnifiedTopology : true
        }, () => console.log('Connected to Atlas DB!'));
};

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };