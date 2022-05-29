const express = require("express");
const router = express.Router();

const billService = require("../bill-service");

router.get("/bills", async (req, res) => {
  billService.getBills(req, res);
});

router.post("/bill", async (req, res) => {
  console.log(req.body)
  billService.postBill(req, res);
})

router.get('/about', async (req, res) => {
  res.send({ title: "OK" });
});

module.exports = router;