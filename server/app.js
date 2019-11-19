const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routes.js");
const app = express();

dotenv.config();

app.use(cors());
app.use(parser.json());
app.use("/", router);

app.set("port", process.env.PORT);

app.listen(process.env.PORT);
console.log("Listening on:", process.env.PORT);

module.exports = app;
