const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");
const router = express.Router();

const billService = require("../services/bill-service");

router.get("/bills", async (req, res) => {
  billService.getBills(req, res);
});

router.post("/bill", async (req, res) => {
  billService.postBill(req, res);
})

router.post("/users", registerUser);
router.post("/login", authUser);

router.get('/about', async (req, res) => {
  res.send({ title: "OK" });
});

module.exports = router;