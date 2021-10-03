const mongoose = require("mongoose")
const MONGO_DB = process.env["MONGO_DB_URI"]
const MONGO_DB_URI = process.env[MONGO_DB_URI]
mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})