const express = require("express");
const { registerUser, authUser, tokenCheck } = require("../controllers/userControllers");
const router = express.Router();
const billService = require("../services/bill-service");
const protect = require("../middlewares/authMiddleware");

router.get("/bills", protect, async (req, res) => {
  billService.getBills(req, res);
});

router.post("/bill", protect, async (req, res) => {
  billService.postBill(req, res);
})

router.get("/token_check", protect, tokenCheck);

router.post("/users", registerUser);
router.post("/login", authUser);

router.get('/about', async (req, res) => {
  res.send({ title: "OK" });
});

module.exports = router;