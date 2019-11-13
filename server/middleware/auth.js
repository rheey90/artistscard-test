const jwt = require("jsonwebtoken");
const jwtsecret = require("../models/queries/jwtsecret");

const authMiddleware = (req, res) => {
  const token = req.headers["x-access-token"] || req.query.token || req.body.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Forbidden"
    });
  }

  const p = jwt.verify(token, jwtsecret);

  return p;
};

module.exports = authMiddleware;
