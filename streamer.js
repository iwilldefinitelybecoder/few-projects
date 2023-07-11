const express = require("express");
const app = express();
const fs = require("fs");
console.log(10**8.5/1000000)
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
    console.log(req.params.filename)
    const range = req.headers.range;
    console.log(range)
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = "spidy.mp4";
    const videoSize = fs.statSync("spidy.mp4").size;
    
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    console.log(start)
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    console.log(end)
    const contentLength = end - start + 1;
    console.log(contentLength)
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
   
    videoStream.pipe(res);
});

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});