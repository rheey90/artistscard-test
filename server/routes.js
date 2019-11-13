const controller = require("./controller");
const auth = require("./middleware/auth");
const router = require("express").Router();

router.post("/sign/checkid", controller.user.checkid);

router.post("/sign/signup", controller.user.signup);

router.post("/sign/signin", controller.user.signin);

router.get("/sign/signout", controller.user.signout);

router.put("/sign/:username/changepw", controller.user.changepw);

module.exports = router;
