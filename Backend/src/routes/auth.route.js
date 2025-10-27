const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../Controllers/auth.controller");

router.post("/user/register",registerUser)
router.post("/user/login",loginUser)
router.get("/user/logout",logoutUser)


module.exports = router;