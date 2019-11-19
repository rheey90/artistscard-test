const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const app = express();
const Music = require("../tables/index").Music;

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(cors());

module.exports = {
  insertdata: (req, res) => {
    const body = req.body;
    Music.create({
      artist: body.artist,
      title: body.title,
      album: body.album,
      filelocation: body.filelocation,
      userid: req.params.userid
    }).then(function() {
      return { isDataCreated: true };
    });
  },
  getdata: (req, res) => {
    return Music.findAll({
      where: { userid: req.params.userid }
    }).then(data => {
      if (data) {
        return data;
      } else {
        return { data: false };
      }
    });
  },
  editdata: (req, res) => {
    const body = req.body;

    Music.update(
      {
        artist: body.artist,
        title: body.title,
        album: body.album,
        filelocation: body.filelocation,
        userid: req.params.usernme
      },
      { where: { id: req.params.musicid } }
    );
    return Music.findOne({ where: { id: req.params.musicid } });
  }
};
