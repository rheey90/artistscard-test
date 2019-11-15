const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const router = require("./routes.js");
const app = express();
const port = 3001;

app.use(cors());
app.use(parser.json());
app.use("/", router);

app.set("port", port);

app.listen(port);
console.log("Listening on:", port);

module.exports = app;
