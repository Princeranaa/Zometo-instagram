const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.route");
const foodpartner = require("../src/routes/foodPartner.route");
const foodItems = require("../src/routes/food.routes")

app.use(cookieParser());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.use("/api/auth", authRoutes);
app.use("/api/auth", foodpartner);
app.use("/api/food",foodItems);



module.exports = app;
