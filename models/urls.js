// Impoting thing we need
const mongoose = require("mongoose");
// Creating schema
const Schema = mongoose.Schema;
// Url Schemama
const urlSchema = new Schema({
    urlCode: {
        type: String,
        require: true,
    },
    longUrl: {
        type: String,
        require: true,
    },
    shortenUrl: {
        type: String,
        require: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
        default: Date.now(),
    },
});
// Exporting schema
const url = mongoose.model("url", urlSchema);
module.exports = url;