const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const cryptosecret = require("./cryptosecret");
const app = express();
const Users = require("../tables/index").Users;

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.set("crypto-secret", cryptosecret);

module.exports = {
  signup: (req, res) => {
    const body = req.body;
    return Users.create({
      username: body.username,
      password: crypto
        .createHmac("sha512", app.get("crypto-secret"))
        .update(body.password)
        .digest("base64")
    });
  },
  signin: (req, res) => {
    return Users.findOne({
      where: {
        username: req.body.username,
        password: crypto
          .createHmac("sha512", app.get("crypto-secret"))
          .update(req.body.password)
          .digest("base64")
      }
    }).then(result => {
      if (result) {
        return { isLogIn: true };
      } else {
        return { isLogIn: false };
      }
    });
  },
  signout: (req, res) => {
    return { isLogIn: false };
  },
  changepw: (req, res) => {
    const body = req.body;
    Users.update(
      {
        username: req.params.username,
        password: crypto
          .createHmac("sha512", app.get("crypto-secret"))
          .update(body.password)
          .digest("base64")
      },
      { where: { username: req.params.username } }
    );
    return Users.findOne({ where: { username: req.params.username } });
  }
};
