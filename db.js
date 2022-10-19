const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING).catch((error) => console.log(error));