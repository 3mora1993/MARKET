import mongoose from 'mongoose';

// Define the post attachment schema
const postAttachmentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the product details schema (only for 'product' type posts)
const productDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  priceMin: { type: Number, required: true },
  priceMax: { type: Number, required: true },
  moq: { type: Number, required: true },
  stock: { type: Number, required: true },
  expiryDate: { type: Date },
});

// Define the main post schema
const postSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['update', 'product'] 
  },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  attachments: { type: [postAttachmentSchema], default: [] },
  productDetails: { 
    type: productDetailsSchema, 
    required: function() { return this.type === 'product'; }, // Only required if type is 'product'
  },
}, { timestamps: true }); // Enable timestamps for auto management of createdAt and updatedAt

// Indexing for faster queries
postSchema.index({ authorId: 1 });
postSchema.index({ createdAt: -1 });

// Pre-save middleware to update the updatedAt field
postSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
