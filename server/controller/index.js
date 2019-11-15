const user = require("../models/queries/user");
const music = require("../models/queries/music");

module.exports = {
  user: {
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
  },
  music: {
    insertdata: async (req, res) => {
      try {
        const data = await music.insertdata(req, res);
        res.status(201);
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    },
    getdata: async (req, res) => {
      try {
        const data = await music.getdata(req, res);
        res.status(200);
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    },
    editdata: async (req, res) => {
      try {
        const data = await music.editdata(req, res);
        res.status(200);
        res.send(data);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
