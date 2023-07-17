const mongoose = require('mongoose');

const connectDatabase = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connnected successfully!');
    }catch (e) {
        console.log(e.message);
    }
}

module.exports = connectDatabase;