:: clones database
for /f "delims=" %%i in ('doppler secrets get MONGO_DB_URI --plain') do set MONGO_DB_URI=%%i
echo %MONGO_DB_URI%
mongodump --uri "%MONGO_DB_URI%" --out ./cloneDB
mongorestore --port 27017 ./cloneDB
:: makes env variable available to authenticated members
doppler run -- nodemon app.js
