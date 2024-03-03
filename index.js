const express = require("express");
const router = require("./routes/route")
require("dotenv").config();
require("./config/dbConnect")
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;

app.use("/", router);

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`server is listneing at port ${PORT}`);
})
