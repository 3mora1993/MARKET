import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/navigation/Breadcrumb';
import { FilterBar } from '../components/filters/FilterBar';
import { QuickFilters } from '../components/filters/QuickFilters';
import { InfiniteProductFeed } from '../components/product/InfiniteProductFeed';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { Megaphone, TrendingUp, Users, Globe2, ArrowRight } from 'lucide-react';
import type { Post } from '../types/feed';
import { api, socketService } from '../services';

export function FeedPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch initial posts and set up WebSocket connection
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await api.getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

    // Set up WebSocket connection
    socketService.connect();

    // Listen for new posts
    const handleNewPost = (newPost: Post) => {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    socketService.on('newPost', handleNewPost);

    // Cleanup
    return () => {
      socketService.off('newPost', handleNewPost);
      socketService.disconnect();
    };
  }, []);

  const handleCreatePost = async (data: { type: 'update' | 'product'; content: string; }) => {
    try {
      const newPost = await api.createPost({
        authorId: 'current-user', // Replace with actual user ID
        author: {
          name: 'John Doe', // Replace with actual user data
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
          role: 'Buyer & Supplier'
        },
        content: data.content,
        likes: 0,
        comments: 0,
        shares: 0,
        bookmarks: 0
      });

      // The new post will be added through the WebSocket connection
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 md:p-8 mb-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Global Trade Opportunities</h1>
          <p className="text-blue-100 text-base md:text-lg mb-6">Connect with verified suppliers and explore premium products from around the world.</p>
          <button className="bg-white text-blue-600 px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2 font-medium text-sm md:text-base">
            Join Premium Network
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <FilterBar
            categories={['Electronics', 'Food & Beverage', 'Textiles', 'Machinery']}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onSortChange={(sort) => console.log('Sort by:', sort)}
          />

          {/* Market Insights */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold">Market Insights</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">#SustainablePackaging</span>
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">#SmartManufacturing</span>
                <span className="text-sm text-green-600">+8.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">#OrganicProducts</span>
                <span className="text-sm text-green-600">+15.2%</span>
              </div>
            </div>
          </div>

          {/* Global Activity */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="w-5 h-5 text-purple-600" />
              <h2 className="font-semibold">Global Activity</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
              <span className="text-sm text-gray-600">850+ active buyers</span>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                125 new inquiries today
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                48 deals closed
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <CreatePost onSubmit={handleCreatePost} />

          <QuickFilters
            selectedFilters={selectedFilters}
            onFilterSelect={(filter) => {
              if (!selectedFilters.includes(filter)) {
                setSelectedFilters(prev => [...prev, filter]);
              }
            }}
            onFilterRemove={(filter) => {
              setSelectedFilters(prev => prev.filter(f => f !== filter));
            }}
          />

          {/* Posts Feed */}
          <div className="space-y-6 mb-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <InfiniteProductFeed 
            onSupplierClick={(supplierId) => navigate(`/supplier/${supplierId}`)}
          />
        </div>
      </div>
    </div>
  );
}