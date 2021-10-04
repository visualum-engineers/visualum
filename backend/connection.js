//BEFORE PROCEEDING, ENSURE THE PRODUCTIONS VARIABLE IS SET TO FALSE!
const production = false
// BEFORE PROCCEDING ENSURE THE PRODUCTION VARIABLE IS SET TO FALSE!
const mongoose = require("mongoose")

//when production is false, it will connect to your cloned local DB
//when production is true, it will connect to the cloud atlas DB
//DO NOT ALTER LOGIC! alter only URI and DB name and
const MONGO_DB = production ? process.env["MONGO_TESTING_DB_URI"]:"mongodb://127.0.0.1:27017/Testing"

mongoose.connect(MONGO_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})