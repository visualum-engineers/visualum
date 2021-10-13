##  Description 
This project was built using the MERN stack
## Prerequisites
1. Install Node.js 16.4.0
2. Install Doppler: https://docs.doppler.com/docs/enclave-installation
    * Ensure you have setup your account, and have accepted the invite to join the doppler visualum team
    * Doppler is in charge of hosting all enviroment variables. 
        * If you do not have access, you will be unable to run/access our Node API.
## Run Frontend Server
1. Open up command line
2. Navigate to the frontend directory by running `cd frontend` from root
3. Run `npm install` to install all dependencies
4. Run `npm start`
    * Will launch frontend server on https://localhost:3000

## Run Node API
1. Open up command line
2. Navigate to backend directory by running `cd backend` from root
3. Run `npm install` to install all dependencies 
4. Launching API
    1. If in development : Run `npm run dev`
        * Will launch API server on https://localhost:8000
    2. If in production : Run `npm start`

## Compiling Sass Files 
1. Development
    * If you use VSCode, install the extension, Live Sass Compiler.
    * If you decide not to use VSCode:
        1. Find another simple software that will automatically compile all scss files, into the main.scss file. 
        2. Ensure sass files are compiled into the main.css file
2. Production
    * We may use webpack
     
