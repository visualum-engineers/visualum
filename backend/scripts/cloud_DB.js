const mongoose = require("mongoose")
const MONGO_DB = process.env["MONGO_DB_URI"]
mongoose.connect(MONGO_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})


console.log(MONGO_DB)