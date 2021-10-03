#!/usr/bin/env
SECRET=$(doppler secrets get MONGO_DB_URI --plain)
#clone database
mongodump --uri "$SECRET" --out ./cloneDB
mongorestore --port 27017 ./cloneDB
#makes env variables available to authenticated members
doppler run -- nodemon app.js