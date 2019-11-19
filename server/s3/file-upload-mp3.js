const aws = require("aws-sdk");
const config = require("./config-artistscard-test");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: "ap-northeast-2"
});

let s3 = new aws.S3();

let uploadMusicFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: "artistscard-test",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "TESTING_META_DATA" });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = uploadMusicFile;
