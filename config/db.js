
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// const mongoURI =
//   'mongodb+srv://nipuna:nipuna2001@cluster0.edu0auc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("database connected"); 
  } catch (err) {
    console.error(err.message); 
    process.exit(1);
  }
};

module.exports = connectDB;
