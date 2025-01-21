import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRouter from './routes/posts.js'; // Import postsRouter
import path from 'path'; // To serve static files (attachments)
import dotenv from 'dotenv'; // To handle environment variables (like MongoDB URI)
import multer from 'multer'; // Import multer for file uploads

// Configure dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (uploads directory) for attachments
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Name the file with a unique timestamp
  }
});

const upload = multer({ storage }); // Create multer instance with the storage configuration

// MongoDB connection using the URI from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Worldmart'; // Fallback to localhost if not set
mongoose
  .connect(MONGO_URI, {
    connectTimeoutMS: 30000, // Increase connection timeout
    socketTimeoutMS: 30000, // Increase socket timeout
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the posts router for any routes starting with /posts
app.use('/posts', postsRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
