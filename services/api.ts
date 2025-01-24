import axios from 'axios';
import type { Post } from '../types/feed';

const API_URL = 'http://localhost:5000';

export const api = {
  // Fetch all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  // Create a new post
  createPost: async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  },

  // Like a post
  likePost: async (postId: string): Promise<void> => {
    await axios.post(`${API_URL}/posts/${postId}/like`);
  },

  // Comment on a post
  commentPost: async (postId: string, comment: string): Promise<void> => {
    await axios.post(`${API_URL}/posts/${postId}/comment`, { comment });
  }
};