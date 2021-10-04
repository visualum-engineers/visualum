#!/usr/bin/env
#clone database
DB_SECRET=$(doppler secrets get MONGO_DB_URI --plain)
mongodump --uri "$MONGO_DB_URI" --out ./cloneDB
mongorestore --port 27017 ./cloneDB
#makes env variables available to authenticated members
doppler run -- nodemon app.js