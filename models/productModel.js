const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    count: {
        type: Number,
        default: 1,
    },
    checked: {
        type: Boolean,
        default: false
    },
    userId: String,
}, { timestamps: true });

module.exports = new mongoose.model("product", productSchema);

