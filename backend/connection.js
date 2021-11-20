//import User from './user.js';
//const User = require('./models/user.js');
const StudentUser = require('./models/studentuser.js');
const TeacherUser = require('./models/teacheruser.js');
const Class = require('./models/class.js');
const School = require('./models/school.js');
const Assignment = require('./models/assignment.js');
const LabelPicture = require('./models/labelspictures.js');
const RewardStore = require('./models/rewardstore.js');
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes/test_router");
//const Assignment = require('./models/user.js');
const MultipleChoice = require('./models/multiplechoice.js');
const ShortAnswer = require('./models/shortanswer.js');
const Matching = require('./models/matching.js');
//nconst Submission = require('./models/Submission.js');
const SchoolRewardStore = require('./models/schoolrewardstore.js');
const ClassRewardStore = require('./models/classrewardstore.js');
//database uri. Change this depending on 
//what database you want to work on 
const db_server = process.env["MONGO_DEV_DB_URI"]

//for logging database name
let db_name = db_server.match(/\/[A-Za-z]+\?/).toString()
db_name = db_name.substring(1, db_name.length-1)

//test db connection 
mongoose.connection.on("connected", function(ref){
    console.log("connected to "+ db_name + " DB!")
    // add middleware set-up
    // add routes

    //test sending json files to frontend
    app.use("/test/", routes)

    //listen to port 7000
    const listener = app.listen(process.env.PORT||7000, ()=>{
        console.log("server running on port " + listener.address().port)
    })
})

mongoose.connection.on("error", function(err) {
    console.error('Failed to connect to DB ' + db_name + ' on startup ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection to DB :' + db_name + ' disconnected');
});

//if node process ends, close mongoose connection
const gracefulExit = function() { 
    mongoose.connection.close(function () {
      console.log('Mongoose default connection with DB :' + db_name + ' is disconnected through app termination');
      process.exit(0);
    });
  }
process.on('SIGINT', gracefulExit).on("SIGNTERM", gracefulExit);

//inital mongoose connection
try{
    mongoose.connect(db_server, { keepAlive: 1 });
    console.log("Trying to connect to DB " + db_name);
} catch (err){
    console.log("Sever initialization failed" , err.message);
}
