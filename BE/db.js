const { MongoClient } = require('mongodb');

// Replace with your MongoDB URI
const uri = 'mongodb+srv://asadiamro:Sh..2803@cluster.1svv9.mongodb.net/';

// Declare db variable to hold the connection
let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('cluster'); // Replace 'worldmart' with your actual database name
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
