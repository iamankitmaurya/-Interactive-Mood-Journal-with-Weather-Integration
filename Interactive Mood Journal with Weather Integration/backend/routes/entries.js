const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, entryController.getEntries);
router.post("/", authenticate, entryController.createEntry);

module.exports = router;
