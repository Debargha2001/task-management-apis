const express = require("express");
const router = require("./routes/route")
require("dotenv").config();
require("./config/dbConnect")

const app = express();

app.use(express.json())

const PORT = process.env.PORT;

app.use("/", router);

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`server is listneing at port ${PORT}`);
})