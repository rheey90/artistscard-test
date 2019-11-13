const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const app = express();
const port = 3001;

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(parser.json());

app.set("port", port);

app.listen(port);
console.log("Listening on:", port);

module.exports = app;
