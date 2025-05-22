"use client"
import { useState } from 'react';
import styles from './admin.module.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    category: 'Adventure',
    image: '',
    readTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Adventure', 'Culture', 'Food', 'Sustainable Travel'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.title || !formData.desc || !formData.image || !formData.readTime) {
        throw new Error('All fields are required');
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create post');
      
      setSuccess('Post created successfully!');
      setFormData({
        title: '',
        desc: '',
        category: 'Adventure',
        image: '',
        readTime: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
        <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Create New Post</h1>
      
      <form onSubmit={handleSubmit} className={styles.adminForm}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Read Time</label>
          <input
            type="text"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            placeholder="e.g., 5 min read"
            required
          />
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminPanel;