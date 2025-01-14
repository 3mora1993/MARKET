import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, FileText, Download, ExternalLink, Bookmark } from 'lucide-react';
import type { Post } from '../../types/feed';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarks);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarkCount(prev => isBookmarked ? prev - 1 : prev + 1);
    // Here you would typically make an API call to update the bookmark status
  };

  const renderAttachments = () => {
    if (!post.attachments.length) return null;

    const images = post.attachments.filter(att => att.type === 'image');
    const documents = post.attachments.filter(att => att.type === 'document');

    return (
      <div className="mt-4 space-y-4">
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {images.map(image => (
              <a
                key={image.id}
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
              >
                <img
                  src={image.thumbnailUrl || image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        )}

        {documents.length > 0 && (
          <div className="space-y-2">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    {doc.size && (
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={doc.url}
                    download
                    className="p-2 hover:bg-gray-200 rounded-full"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </a>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-200 rounded-full"
                    title="Open"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium">{post.author.name}</h3>
            <p className="text-sm text-gray-600">
              {post.author.role} • {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <button 
          onClick={handleBookmark}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>

      {renderAttachments()}

      <div className="flex items-center gap-6 mt-6 pt-4 border-t">
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <Heart className="w-5 h-5" />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <Share2 className="w-5 h-5" />
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
}