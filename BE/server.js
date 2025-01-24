import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import postsRouter from './routes/posts.js';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
import multer from 'multer';
import { fileURLToPath } from 'url';

// Configure dotenv
dotenv.config();

// Setup the express application
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Create the HTTP server and initialize Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Serve static files (uploads directory) for attachments
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Basic file type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
  },
});

// MongoDB connection using the URI from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Worldmart';
const connectWithRetry = () => {
  mongoose
    .connect(MONGO_URI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => {
      console.error('Error connecting to MongoDB. Retrying in 5 seconds...', err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Attach the Socket.IO instance to the app
app.set('io', io);

// Use the posts router for any routes starting with /posts
app.use('/posts', postsRouter);

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('new-post', (newPost) => {
    console.log('New post received:', newPost);
    io.emit('new-post', newPost); // Emit the event to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message || 'Something went wrong!' });
});

// Start the server using the HTTP server instance
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
