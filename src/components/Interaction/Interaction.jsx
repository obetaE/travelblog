"use client"
import { useState } from 'react';
import { FaRegHeart, FaHeart, FaRegComment, FaShare } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';


const SocialInteraction = ({ postUrl }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Add your API call to update likes here
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this post!',
        url: postUrl,
      });
    } catch (error) {
      // Fallback for browsers that don't support Web Share API
      setShowShareOptions(!showShareOptions);
    }
  };

  return (
    <div className="social-interaction">
      <div className="flex items-center gap-4">
        {/* Like Button */}
        <button onClick={handleLike} className="flex items-center gap-1">
          {isLiked ? (
            <FaHeart className="text-red-500 transition-colors duration-200" />
          ) : (
            <FaRegHeart className="text-gray-600 hover:text-red-400 transition-colors duration-200" />
          )}
          <span className="text-gray-600">{isLiked ? 'Liked' : 'Like'}</span>
        </button>

        {/* Comment Button */}
        <button className="flex items-center gap-1">
          <FaRegComment className="text-gray-600 hover:text-blue-400 transition-colors duration-200" />
          <span className="text-gray-600">Comment</span>
        </button>

        {/* Share Button */}
        <div className="relative">
          <button 
            onClick={handleShare}
            className="flex items-center gap-1"
          >
            <FaShare className="text-gray-600 hover:text-green-400 transition-colors duration-200" />
            <span className="text-gray-600">Share</span>
          </button>

          {/* Share Options Dropdown */}
          {showShareOptions && (
            <div className="absolute bottom-full left-0 bg-white p-2 rounded-lg shadow-lg flex gap-2">
              <FacebookShareButton url={postUrl}>
                <span className="text-blue-600 hover:text-blue-800">Facebook</span>
              </FacebookShareButton>
              <TwitterShareButton url={postUrl}>
                <span className="text-blue-400 hover:text-blue-600">Twitter</span>
              </TwitterShareButton>
              <LinkedinShareButton url={postUrl}>
                <span className="text-blue-700 hover:text-blue-900">LinkedIn</span>
              </LinkedinShareButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialInteraction;