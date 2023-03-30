const dotenv = require('dotenv').config();
const connectDB = require('./utils/db.js');
const fs = require('fs')

connectDB();

const Train = require('./models/trainModel.js')

const trains = JSON.parse(fs.readFileSync(`${__dirname}/resources/train.json`, 'utf-8'));

const importData = async () => {
try {
    await Train.create(trains);
    console.log('Data Imported...');
    process.exit();
} catch (err) {
    console.log(err);
}
};

const deleteData = async () => {
    try {
      await Train.deleteMany();
      console.log('Data Destroyed...');
      process.exit();
    } catch (err) {
      console.log(err);
    }
  };



if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}