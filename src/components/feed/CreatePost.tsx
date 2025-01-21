import React, { useState } from 'react';
import { Image, FileText, X, Loader, Package2, MessageSquare, Video } from 'lucide-react';
import axios from 'axios';

interface CreatePostProps {
  onSubmit?: (data: {
    type: 'update' | 'product';
    content: string;
    attachments: File[];
    productDetails?: {
      name: string;
      category: string;
      price: { min: number; max: number };
      moq: number;
      stock: number;
      expiryDate?: string;
      tags: string[];
    };
  }) => Promise<void>;
}

const CATEGORIES = [
  'Food & Beverage',
  'Electronics',
  'Textiles',
  'Machinery',
  'Chemicals',
  'Construction',
  'Agriculture'
];

const TAGS = [
  'Sustainable',
  'Organic',
  'Fair Trade',
  'Premium',
  'New Arrival',
  'Best Seller',
  'Limited Stock',
  'Bulk Available'
];

export function CreatePost({ onSubmit }: CreatePostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postType, setPostType] = useState<'update' | 'product'>('update');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState(0);

  // Product form state
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: { min: 0, max: 0 },
    moq: 0,
    stock: 0,
    expiryDate: '',
    tags: [] as string[]
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setContent(text);
      setCharacterCount(text.length);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + attachments.length <= 5) {
      setAttachments(prev => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!content.trim() && attachments.length === 0) || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Structure the data to match your MongoDB schema
      const postData = {
        type: postType === 'product' ? 'product' : 'update',
        content: content.trim(),
        tags: selectedTags,
        ...(postType === 'product' && { productDetails })
      };

      formData.append('type', postData.type);
      formData.append('content', postData.content);
      formData.append('tags', JSON.stringify(postData.tags));

      if (postType === 'product') {
        formData.append('productDetails', JSON.stringify(productDetails));
      }

      // Append attachments
      attachments.forEach(file => {
        formData.append('attachments', file);
      });

      // Get token from localStorage (or from your global state)
      const token = localStorage.getItem('token'); // replace with your token retrieval logic

      // Send to backend with token in the Authorization header
      const response = await axios.post('http://localhost:5000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        // Only call onSubmit if it exists
        if (onSubmit) {
          await onSubmit({
            type: postType,
            content,
            attachments,
            productDetails: postType === 'product' ? productDetails : undefined
          });
        }

        // Reset form state
        setContent('');
        setAttachments([]);
        setSelectedTags([]);
        setProductDetails({
          name: '',
          category: '',
          price: { min: 0, max: 0 },
          moq: 0,
          stock: 0,
          expiryDate: '',
          tags: []
        });
        setIsExpanded(false);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Error creating post!';
        alert(errorMessage);
      } else {
        alert('Error creating post!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isExpanded) {
    return (
      <div 
        onClick={() => setIsExpanded(true)}
        className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors mb-6"
      >
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-gray-500">
            Share an update or add a product...
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Image className="w-5 h-5" />
            <Video className="w-5 h-5" />
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPostType('update')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${postType === 'update' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <MessageSquare className="w-4 h-4" />
            Share Update
          </button>
          <button
            type="button"
            onClick={() => setPostType('product')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${postType === 'product' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Package2 className="w-4 h-4" />
            Add Product
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {postType === 'product' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={productDetails.name}
              onChange={(e) => setProductDetails(prev => ({ ...prev, name: e.target.value }))}
              maxLength={50}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={productDetails.category}
              onChange={(e) => setProductDetails(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (USD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={productDetails.price.min}
                onChange={(e) => setProductDetails(prev => ({
                  ...prev,
                  price: { ...prev.price, min: parseFloat(e.target.value) }
                }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Min Price"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (USD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={productDetails.price.max}
                onChange={(e) => setProductDetails(prev => ({
                  ...prev,
                  price: { ...prev.price, max: parseFloat(e.target.value) }
                }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Max Price"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MOQ (Minimum Order Quantity)</label>
            <input
              type="number"
              min="1"
              value={productDetails.moq}
              onChange={(e) => setProductDetails(prev => ({ ...prev, moq: parseInt(e.target.value, 10) }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MOQ"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Availability</label>
            <input
              type="number"
              min="0"
              value={productDetails.stock}
              onChange={(e) => setProductDetails(prev => ({ ...prev, stock: parseInt(e.target.value, 10) }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Available Stock"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              value={productDetails.expiryDate}
              onChange={(e) => setProductDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          value={content}
          onChange={handleContentChange}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What's on your mind?"
        ></textarea>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <span>{characterCount} / 500</span>
          <button
            type="button"
            onClick={() => setShowPreview(prev => !prev)}
            className="hover:text-blue-500"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div className="flex gap-2 flex-wrap">
          {TAGS.map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
        <input
          type="file"
          multiple
          accept="image/*,video/*,audio/*,application/pdf,.doc,.docx,.ppt,.txt"
          onChange={handleFileSelect}
          className="w-full text-sm text-gray-700"
        />
        <div className="mt-2 flex gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <span>{file.name}</span>
              <button type="button" onClick={() => removeAttachment(index)} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
        >
          {isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : 'Post'}
        </button>
      </div>
    </form>
  );
}
