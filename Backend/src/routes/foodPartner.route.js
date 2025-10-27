const express = require("express");
const router = express.Router();
const { registerFoodPartner, loginFoodPartner, LogoutFoodPartner } = require("../Controllers/foodpartner.controller");

router.post("/food-partner/register",registerFoodPartner)
router.post("/food-partner/login",loginFoodPartner)
router.get("/food-partner/logout",LogoutFoodPartner)


module.exports = router;