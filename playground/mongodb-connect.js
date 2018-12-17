const MongoClient = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
      return console.log('Unable to connect');
    }
    console.log('Connected to server');
    db.close();
});


//windows
//go to the bin folder and open the terminal here and run following command
//create mongo-data folder in user directory
// mongod.exe --dbpath /Users/Romu/mongo-data


//linux
//go to the bin folder and open the terminal here and run following command
//create mongo-data folder in home directory
// ./mongod --dbpath ~/mongo-data