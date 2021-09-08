// Importing thing we need
const mongoose = require("mongoose");
// Creating db connection
const db = mongoose
    .connect(process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log(`Connected to DB`);
    })
    .catch((e) => {
        console.log(e);
    });

// Exporting db
module.exports = db;