for /f "delims=" %%i in ('doppler secrets get MONGO_DB_URI --plain') do set SECRET=%%i
:: clones database
mongodump --uri "%SECRET%" --out ./cloneDB
mongorestore --port 27017 ./cloneDB
:: makes env variable available to authenticated members
doppler run -- nodemon app.js