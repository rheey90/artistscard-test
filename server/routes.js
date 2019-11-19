const controller = require("./controller");
const uploadmp3 = require("./s3/file-upload-mp3");
const router = require("express").Router();

router.post("/sign/signup", controller.user.signup);

router.post("/sign/signin", controller.user.signin);

router.get("/sign/signout", controller.user.signout);

router.put("/sign/:userid/changepw", controller.user.changepw);

router.post("/music/:userid/uploadtos3", uploadmp3.single("mp3"), (req, res) => {
  return res.json({ mp3Url: req.file.location });
});

router.post("/music/:userid", controller.music.insertdata);

router.get("/music/:userid", controller.music.getdata);

router.put("/music/:userid/:musicid", controller.music.editdata);

module.exports = router;
