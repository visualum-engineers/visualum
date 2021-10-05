const mongoose = require("mongoose")
// connect to locally hosted database on port 27017
// In the following url, the database name is Testing-Cluster
// IF you want to work/clone a different database
// replace the last string after /, 
// to the name of database you want
// DO NOT CHANGE ANYTHING ELSE!
const url = 'mongodb://127.0.0.1:27017/Testing'
mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    // Deletes the database
    return new Promise((resolve, reject)=>{
        resolve(mongoose.connection.db.dropDatabase(
            console.log("Database refreshed")
        ));
    })
}).finally(()=>{
    //exits the script
    process.exit()
})