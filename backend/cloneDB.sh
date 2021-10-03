
SECRET=$(doppler secrets get MONGO_DB_URI --plain)
npm install
mongodump --uri "$SECRET" --out ./cloneDB
mongorestore --port 27017 ./cloneDB
nodemon 
app.js
echo $SECRET