# csv-read-write

# To run the app.
===============

Clone Notifications on your machine and follow the steps:
https://github.com/pankaj-shimpi/csv-read-write.git

Pre-requisite

# Make sure you have NodeJS, NPM, MongoDB, ReactJS, etc.

1. Make sure you have node installed on your machine. with a version v8 or higher. If not follow the steps:
```
    nvm install v8+
    Or you can follow the download and installation steps from:

    https://nodejs.org/en/download/
```

2. Make sure you have npm installed on your machine. version v6 or higher.If not follow the steps:
```
    npm install -g npm
```

3. Make sure you have MongoDB installed on your machine.
```
    If not please install it by:
        
        Steps:
        1. sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
        
        2. 
            Ubuntu 12.04
                echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

            Ubuntu 14.04
                echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

            Ubuntu 16.04
                echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
        
        3. sudo apt-get update

        4. sudo apt-get install -y mongodb-org

        5. Start mongodb service: 
            sudo service mongod start
        

    Or you can follow the download and installation steps from:
        https://docs.mongodb.com/manual/administration/install-community/

    Make sure MongoDB is running on default port 27017. If not please change config settings in:
    
        server/config/config.json 

        add all needed details. e.g database name, post, host, etc.
```

4. Now go to the node directory.
```
    cd csv-read-write
```

5. Install the server dependencies
```
    npm install
```

6. Run server
```
    npm run start
```
7. You can test this app by 2 API 

    1. Using POST method, 
        URL: http://localhost:5000/search
        method: POST
        body: {
          startDate: 1548976023000,
          enddate: 1581487727000,
        }

        This will return an URL, once you open that URL it will either show you the data from csv file, or if you paste that URL inside browser it will download the CSV file.

    2. Using GET method:
        URL: http://localhost:5000/search?startDate=1548976023000&endDate=1581487727000
        method: GET

        This will return an URL, once you open that URL it will either show you the data from csv file, or if you paste that URL inside browser it will download the CSV file.

    3. You can also download the file by hitting:
        URL: "http://localhost:5000/download"
        method: GET


