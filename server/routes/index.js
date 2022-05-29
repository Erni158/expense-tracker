const express = require("express");
const router = express.Router();

const billService = require("../bill-service");

router.get("/bill", (req, res, next) => {
  billService.get(req, res);
});

router.get('/about', function (req, res) {
  res.send('About this wiki');
})

module.exports = router;