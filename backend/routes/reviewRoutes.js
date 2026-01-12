const express = require("express");
const {
  getAllReviews,
  createStory,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/all", getAllReviews);
router.post("/submit", createStory);

module.exports = router;
