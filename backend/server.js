const express = require("express");
const routes = require("./routes/test_router")
const app = express();

app.use("/test/", routes)

//listen to port 8000
const listener = app.listen(process.env.PORT||8000, ()=>{
    console.log("server running on port " + listener.address().port)
})