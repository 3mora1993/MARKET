import React, { useState } from 'react';
import { Image, FileText, Send, X, Loader, Package2, MessageSquare, Calendar, Tag, DollarSign, Box, Video, ChevronDown } from 'lucide-react';
import type { Attachment } from '../../types/feed';

interface CreatePostProps {
  onSubmit: (data: {
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
      await onSubmit({
        type: postType,
        content,
        attachments,
        productDetails: postType === 'product' ? productDetails : undefined
      });
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
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              postType === 'update'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Share Update
          </button>
          <button
            type="button"
            onClick={() => setPostType('product')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              postType === 'product'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
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

      {postType === 'product' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price (USD)
              </label>
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price (USD)
              </label>
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
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MOQ (Units)
              </label>
              <input
                type="number"
                min="1"
                value={productDetails.moq}
                onChange={(e) => setProductDetails(prev => ({ ...prev, moq: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Available
              </label>
              <input
                type="number"
                min="1"
                value={productDetails.stock}
                onChange={(e) => setProductDetails(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              value={productDetails.expiryDate}
              onChange={(e) => setProductDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {postType === 'product' ? 'Product Description' : 'What would you like to share?'}
        </label>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={postType === 'product' 
            ? 'Describe your product...' 
            : 'Share an update...'
          }
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          required
        />
        <div className="text-sm text-gray-500 mt-1">
          {characterCount}/500 characters
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (up to 3)
        </label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5"
            >
              {file.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t">
        <div className="flex items-center gap-2">
          <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <Image className="w-5 h-5 text-gray-600" />
          </label>
          <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <Video className="w-5 h-5 text-gray-600" />
          </label>
          <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <FileText className="w-5 h-5 text-gray-600" />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={isSubmitting || (!content.trim() && attachments.length === 0)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                {postType === 'product' ? 'Adding Product...' : 'Posting...'}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {postType === 'product' ? 'Add Product' : 'Post'}
              </>
            )}
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Preview</h3>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="prose max-w-none">
              {postType === 'product' && (
                <>
                  <h2>{productDetails.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="w-4 h-4" />
                    {productDetails.category}
                  </div>
                  <div className="flex items-center gap-4 my-2">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${productDetails.price.min} - ${productDetails.price.max}
                    </div>
                    <div className="flex items-center gap-1">
                      <Box className="w-4 h-4" />
                      MOQ: {productDetails.moq} units
                    </div>
                  </div>
                </>
              )}
              <div className="whitespace-pre-wrap">{content}</div>
              {selectedTags.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {selectedTags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {attachments.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {attachments.map((file, index) => (
                    <div key={index} className="relative">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg">
                          <FileText className="w-5 h-5" />
                          {file.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}