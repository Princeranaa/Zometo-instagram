require("dotenv").config();
// server start
const app = require("./src/app");

const db = require("./src/config/db");
db.connectDb();



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})