'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentSection = () => {
  // Dummy initial comments
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'TravelerJane',
      content: 'Love this post! The photos are stunning 😍',
      timestamp: new Date('2024-03-10'),
      replies: [
        {
          id: 2,
          author: 'WanderlustSam',
          content: 'Totally agree! Makes me want to book a flight immediately ✈️',
          timestamp: new Date('2024-03-11')
        }
      ]
    },
    {
      id: 3,
      author: 'AdventureMike',
      content: 'Great tips! Especially liked the packing suggestions 🎒',
      timestamp: new Date('2024-03-12'),
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !newComment.trim()) {
      setError('Please fill in both name and comment fields');
      return;
    }

    const tempComment = {
      id: Date.now(),
      author: name,
      content: newComment,
      timestamp: new Date(),
      replies: []
    };

    setComments([tempComment, ...comments]);
    setNewComment('');
    setName('');
    setError('');
  };

  const renderComments = (commentArray, depth = 0) => {
    return commentArray.map((comment) => (
      <div 
        key={comment.id}
        className={`ml-${depth * 4} mt-4 p-4 bg-white rounded-lg shadow-sm`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-emerald-600">{comment.author}</span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
          </span>
        </div>
        <p className="text-gray-700">{comment.content}</p>
        
        {/* Reply button */}
        <button className="mt-2 text-sm text-gray-500 hover:text-emerald-600">
          Reply
        </button>

        {/* Nested comments */}
        {comment.replies > 0 && (
          <div className="mt-4 border-l-2 border-gray-100 pl-4">
            {renderComments(comment.replies, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 sm: w-full"
          />
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-3 border rounded-lg h-32 focus:ring-2 focus:ring-emerald-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition self-end"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {renderComments(comments)}
      </div>
    </div>
  );
};

export default CommentSection;