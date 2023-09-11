const mongoose = require('mongoose');

(async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/basmah9');
        console.log("db is connected");
    } catch (error) {
        console.log(error)
    }
})();

