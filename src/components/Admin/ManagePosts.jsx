"use client"
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegComment } from 'react-icons/fa';
import styles from "./styles/Manage.module.css";

const ManagePost = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from your API
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await fetch(`/api/blog/${postId}`, { method: 'DELETE' });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.postsList}>

            <div
              className={styles.postItem}
            >
              <div className={styles.stats}>
                <div className={styles.metrics}>
                  <span aria-label="Likes">
                    {" "}
                    <FaHeart className="text-red-500" /> 0
                  </span>
                  <span aria-label="Comments">
                    <FaRegComment className="text-gray-600" />{" "}
                    0
                  </span>
                </div>
                <button
                  className={styles.deleteBtn}
                  aria-label="Delete post"
                >
                  Loading...
                </button>
              </div>

              <div className={styles.postInfo}>
                <h3>Loading...</h3>
                <span className={styles.date}>
                  Loading...
                </span>
              </div>
            </div>

        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Posts</h1>
      </div>

      <div className={styles.postsList}>
        {posts.map(post => (
          <div 
            key={post._id} 
            className={styles.postItem}
            onClick={() => setSelectedPost(post)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.stats}>
              <div className={styles.metrics}>
                <span aria-label="Likes"> <FaHeart className="text-red-500"/> {post.likes}</span>
                <span aria-label="Comments"><FaRegComment className="text-gray-600" /> {post.comments.length}</span>
              </div>
              <button 
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post._id);
                }}
                aria-label="Delete post"
              >
                Delete
              </button>
            </div>

            <div className={styles.postInfo}>
              <h3>{post.title}</h3>
              <span className={styles.date}>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <button 
              className={styles.closeBtn}
              onClick={() => setSelectedPost(null)}
              aria-label="Close overlay"
            >
              &times;
            </button>
            <h2>{selectedPost.title}</h2>
            <p className={styles.postDescription}>
              {selectedPost.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePost;