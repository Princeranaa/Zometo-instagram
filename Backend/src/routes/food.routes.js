const express = require("express");
const router = express.Router();
const {createFood,getFoodItems,getFoodPartnerById,likeFood,saveFood, getSaveFood} = require("../Controllers/foodItems.controller");
const {authFoodPartnerMiddlewares,authMiddlewares} = require("../middlewares/auth.middlewares");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/",authFoodPartnerMiddlewares,upload.single("video"),createFood);
router.get("/", authMiddlewares, getFoodItems);

// likes food
router.post("/like", authMiddlewares, likeFood);
router.post("/save", authMiddlewares,saveFood)
router.get('/save', authMiddlewares, getSaveFood)

router.get("/:id", authMiddlewares, getFoodPartnerById);

module.exports = router;
