for /f "delims=" %%i in ('doppler secrets get MONGO_DB_URI --plain') do set SECRET=%%i
mongodump --uri "%SECRET%" --out ./cloneDB
mongorestore --port 27017 ./cloneDB
doppler run -- nodemon app.js