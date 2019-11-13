const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const cryptosecret = require("./cryptosecret");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const jwtsecret = require("./jwtsecret");
const auth = require("../../middleware/auth");
const app = express();
const User = require("../tables/index").User;

const getUser = async obj => {
  return await User.findOne({ where: obj });
};

let extractJWT = passportJWT.ExtractJwt;
let JWTStrategy = passportJWT.Strategy;
let JWTOptions = {};

JWTOptions.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
JWTOptions.secretOrKey = jwtsecret;

let strategy = new JWTStrategy(JWTOptions, (jwt_payload, next) => {
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

app.use(passport.initialize());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.set("crypto-secret", cryptosecret);

app.get("/", (req, res) => {
  res.status(200).send("Success");
});

module.exports = {
  checkid: (req, res) => {
    const body = req.body;
    return User.findOne({
      where: { username: body.username },
      attributes: ["id"]
    }).then(name => {
      if (name) {
        return { alreadyExists: true };
      } else {
        return { alreadyExists: false };
      }
    });
  },
  signup: (req, res) => {
    const body = req.body;
    return User.create({
      username: body.username,
      password: crypto
        .createHmac("sha512", app.get("crypto-secret"))
        .update(body.password)
        .digest("base64")
    });
  },
  signin: (req, res) => {
    return User.findOne({
      where: {
        username: req.body.username,
        password: crypto
          .createHmac("sha512", app.get("crypto-secret"))
          .update(req.body.password)
          .digest("base64")
      }
    }).then(result => {
      if (result) {
        let payload = { id: result.id };
        let token = jwt.sign(payload, JWTOptions.secretOrKey);
        passport.authenticate("jwt", { session: false });
        res.setHeader("x-access-token", token);
        return { isLogIn: true };
      } else {
        return { isLogIn: false };
      }
    });
  },
  signout: (req, res) => {
    let tokenValidation = auth(req, res);
    if (tokenValidation.id) {
      return { isLogIn: false };
    }
  },
  changepw: (req, res) => {
    const body = req.body;
    let tokenValidation = auth(req, res);
    if (tokenValidation.id) {
      User.update(
        {
          username: req.params.username,
          password: crypto
            .createHmac("sha512", app.get("crypto-secret"))
            .update(body.password)
            .digest("base64")
        },
        { where: { username: req.params.username } }
      );
      return User.findOne({ where: { username: req.params.username } });
    }
  }
};
