##  Description 
This project was built using the MERN stack
## Prerequisites
1. Install Node.js 16.4.0
2. Install MongoDB Database Tools: https://docs.mongodb.com/database-tools/installation/installation-windows/ 
3. Install Doppler: https://docs.doppler.com/docs/enclave-installation
    * Ensure you have setup your account, and have accepted the invite to join the doppler visualum team
    * Doppler is in charge of hosting all enviroment variables. 
        * If you do not have access, you will be unable to run our Node API.
## Run Frontend Server
1. Open up command line
2. Navigate to the frontend directory by running `cd frontend` from root
3. Run `npm install` to install all dependencies
4. Run `npm start`

## Run Node API
1. Open up command line
2. Navigate to backend directory by running `cd backend` from root
3. Run `npm install` to install all dependencies 
4. Launching API Server
    1. If in development : 
        * On Windows:
            * Run `npm run win_dev`
        * On MacOS:
            * Run `npm run mac_dev`
    2. If in production : Run `npm start`

## Compiling Sass Files 
1. Development
    * If you use VSCode, install the extension, Live Sass Compiler.
    * If you decide not to use VSCode:
        1. Find another simple software that will automatically compile all scss files, into the main.css file. 
        2. Ensure sass files are compiled into the main.css file
2. Production
    * We may use webpack
     