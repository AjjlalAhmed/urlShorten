// Importing thing we need
const express = require("express");
const Url = require("../models/urls");
const path = require("path");
// Creating router
const router = express.Router();
// Routes
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../view", "index.html"));
});
router.get("/shorten", (req, res) => {
    res.sendFile(path.join(__dirname, "../view", "shorten.html"));
});
router.get("/tracker", (req, res) => {
    res.sendFile(path.join(__dirname, "../view", "tracker.html"));
});
router.get("/urldata", async(req, res) => {
    const id = req.query.id;
    Url.findOne({ urlCode: id })
        .then((data) => {
            if (data == null) {
                res.status(404).json("No URL Found");
            } else {
                res.send({
                    status: 200,
                    response: data,
                });
            }
        })
        .catch((e) => {
            console.log(e);
        });
});
// Shorten
router.get("*", async(req, res) => {
    const urlCode = req.params[0].substring(1);
    const url = await Url.findOne({
        urlCode,
    });
    if (url) {
        await Url.updateOne({ urlCode: urlCode }, {
            clicks: url.clicks + 1,
        });
        res.redirect(url.longUrl);
    } else {
        res.status(404).json("No URL Found");
    }
});
// Exporing router
module.exports = router;