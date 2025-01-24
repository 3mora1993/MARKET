import express from "express";
import Post from "../models/post.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

// Set the storage for multer with customized file destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "uploads"); // Use path.join for cross-platform compatibility
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the uploads folder exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename based on current timestamp
  },
});

// Set up multer with size limit and file handling
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Allow only specific file types
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only JPG, PNG, and PDF are allowed.")
      );
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post("/", upload.array("attachment", 5), async (req, res) => {
  try {
    // Debugging logs for request body and files
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Destructure the necessary fields from the request body
    const { type, content, tags, productDetails, authorId } = req.body;

    // Validate required fields
    if (!type || !content || !authorId) {
      return res
        .status(400)
        .json({ message: "Type, content, and authorId are required" });
    }

    // Validate 'type' for allowed values
    if (!["update", "product"].includes(type)) {
      return res
        .status(400)
        .json({ message: 'Invalid post type, must be "update" or "product"' });
    }

    // Validate 'authorId' format
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "Invalid authorId format" });
    }

    // Handle file attachments
    const attachments = req.files
      ? req.files.map((file) => ({
          fileName: file.filename,
          fileType: file.mimetype,
          fileUrl: `/uploads/${file.filename}`, // Complete the file URL
        }))
      : [];

    // Create the new post
    const newPost = new Post({
      authorId: new mongoose.Types.ObjectId(authorId),
      type,
      content,
      tags: tags || [],
      attachments,
      ...(type === "product" && { productDetails }), // Only add product details if post type is 'product'
    });

    // Log the post data before saving for debugging
    console.log("New post data:", newPost);

    // Save the new post to the database
    await newPost.save();

    // Emit the new post to connected clients via Socket.IO
    const io = req.app.get("io"); // Access the `io` instance set in server.js
    io.emit("new-post", newPost); // Emit the event to all connected clients

    // Respond with the created post
    res.status(201).json(newPost);
  } catch (error) {
    // Detailed error handling
    console.error("Error creating post:", error.message);

    // Check if the error is due to multer file validation
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: `File upload error: ${error.message}` });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: `Validation error: ${error.message}` });
    }

    // Handle any other errors (including database issues)
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// GET route to fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.status(200).json(posts); // Send the posts as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

export default router;
