const user = require("../models/queries/user");

module.exports = {
  user: {
    checkid: async (req, res) => {
      try {
        const data = await user.checkid(req, res);
        res.status(200);
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    },
    signup: async (req, res) => {
      try {
        const data = await user.signup(req, res);
        res.status(201);
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    },
    signin: async (req, res) => {
      try {
        const data = await user.signin(req, res);
        res.status(201);
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    },
    signout: async (req, res) => {
      try {
        const data = await user.signout(req, res);
        res.status(201);
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    },
    changepw: async (req, res) => {
      try {
        const data = await user.changepw(req, res);
        res.status(200);
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
