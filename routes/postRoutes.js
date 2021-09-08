// Importing thine we need
const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/urls");
// Creating router
const router = express.Router();
// Routes
router.post("/shorten", async(req, res) => {
    const longUrl = req.body.url;
    const urlCode = shortid.generate();
    if (validUrl.isUri(longUrl)) {
        try {
            const url = await Url.findOne({ longUrl });
            if (url) {
                res.send(url);
            } else {
                const shortenUrl = `${process.env.BASEURL}/${urlCode}`;
                const newUrl = new Url({
                    urlCode: urlCode,
                    longUrl: longUrl,
                    shortenUrl: shortenUrl,
                    date: Date.now(),
                });
                await newUrl
                    .save()
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        } catch (e) {}
    } else {
        resizeBy.send({
            status: "Fail",
            errorMessage: "Invalid url",
        });
    }
});
// Exporting router
module.exports = router;