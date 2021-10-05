:: removes local version of database
:: to change database target for cloning 
:: go to local_DB.js file, and change the database name
cd scripts
node local_DB.js
cd ../
:: clones database
:: change the DB uri after 'doppler secrets get', but BEFORE --plain
:: to the uri of the database you want to work on
:: NOTE: Database URIs on stored on doppler 
:: DO NOT CHANGE ANYTHING ELSE!
echo off
for /f "delims=" %%i in ('doppler secrets get MONGO_TESTING_DB_URI --plain') do set MONGO_TESTING_DB_URI=%%i
mongodump --uri "%MONGO_TESTING_DB_URI%"
mongorestore --port 27017
echo on

rmdir /s /q dump
:: makes env variable available to authenticated members
doppler run -- nodemon server.js
