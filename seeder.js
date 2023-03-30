const dotenv = require('dotenv').config();
const connectDB = require('./utils/db.js');
const fs = require('fs')

connectDB();

const Train = require('./models/trainModel.js')

//Reads to JSON files and parse it
const trains = JSON.parse(fs.readFileSync(`${__dirname}/resources/train.json`, 'utf-8'));

//Funtion to import Train Data into DB
const importData = async () => {
try {
    await Train.create(trains);
    console.log('Data Imported...');
    process.exit();
} catch (err) {
    console.log(err);
}
};

//Function to delete Train Data from DB
const deleteData = async () => {
    try {
      await Train.deleteMany();
      console.log('Data Destroyed...');
      process.exit();
    } catch (err) {
      console.log(err);
    }
  };


//Calls function based on input
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}