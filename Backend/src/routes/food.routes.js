const express = require("express");
const router = express.Router();
const {createFood,getFoodItems,getFoodPartnerById,likeFood,saveFood} = require("../Controllers/foodItems.controller");
const {authFoodPartnerMiddlewares,authMiddlewares} = require("../middlewares/auth.middlewares");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/",authFoodPartnerMiddlewares,upload.single("video"),createFood);
router.get("/", authMiddlewares, getFoodItems);
router.get("/:id", authMiddlewares, getFoodPartnerById);


// likes food
router.post("/like", authMiddlewares, likeFood);
router.post("/save", authMiddlewares,saveFood)

module.exports = router;
