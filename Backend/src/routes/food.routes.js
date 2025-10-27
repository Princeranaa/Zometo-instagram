const express = require("express");
const router = express.Router();
const { createFood } = require("../Controllers/foodItems.controller");
const { authFoodPartnerMiddlewares } = require("../middlewares/auth.middlewares");
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage()
}) 

router.post("/", authFoodPartnerMiddlewares, upload.single("video"), createFood);

module.exports = router;
