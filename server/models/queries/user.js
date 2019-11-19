const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const cryptosecret = require("./cryptosecret");
const app = express();
const Users = require("../tables/index").Users;

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(cors());

app.set("crypto-secret", cryptosecret);

module.exports = {
  signup: (req, res) => {
    const body = req.body;
    return Users.create({
      userid: body.userid,
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
        userid: req.body.userid,
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
        userid: req.params.userid,
        password: crypto
          .createHmac("sha512", app.get("crypto-secret"))
          .update(body.password)
          .digest("base64")
      },
      { where: { userid: req.params.userid } }
    );
    return Users.findOne({ where: { userid: req.params.userid } });
  }
};
