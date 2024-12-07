const express = require("express");
const router = express.Router();
const { checkBalance, topUp } = require("../controllers/balanceController");

router.get("/:userId", checkBalance);
router.post("/:userId/topup", topUp);

module.exports = router;
