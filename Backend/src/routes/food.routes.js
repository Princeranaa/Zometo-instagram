const express = require("express");
const router = express.Router();
const { createFood,getFoodItems } = require("../Controllers/foodItems.controller");
const { authFoodPartnerMiddlewares, authMiddlewares } = require("../middlewares/auth.middlewares");
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage()
}) 

router.post("/", authFoodPartnerMiddlewares, upload.single("video"), createFood);
router.get("/", authMiddlewares, getFoodItems);

module.exports = router;
