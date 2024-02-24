const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(resp=> {
    console.log("db connected successfully");
}).catch(err => {
    console.log(err)
})