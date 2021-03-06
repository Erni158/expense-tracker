const jwt = require("jsonwebtoken");
const env = require("../environment/env");

const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;