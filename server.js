// Impoting thing we need
const express = require("express");
require("dotenv").config();
// Creating app
const app = express();
// Middleware
app.use(express.json());
app.use(express.static("public"));
// Routes
app.use("/", require("./routes/getRoutes"));
app.use("/api/", require("./routes/postRoutes"));
// Port
const PORT = process.env.PORT || 8080;
// Connection to DB & Listening to server
(async() => {
    try {
        await require("./db/conection");
        app.listen(PORT, () => {
            console.log(`Server in running on Port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
})();