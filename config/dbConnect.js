const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://debargha:9UuO50UiebISPNhb@cluster0.99pmzu1.mongodb.net/TaskManagementDB?retryWrites=true&w=majority").then(resp=> {
    console.log("db connected successfully");
}).catch(err => {
    console.log(err)
})