"use client"
import { useState, useRef } from 'react'; 
import styles from './styles/AddPosts.module.css';
import axios from 'axios';

const AddPosts = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    category: 'Adventure',
    readTime: ''
  });
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInput = useRef(); // Added ref

  const categories = ['Adventure', 'Culture', 'Food', 'Sustainable Travel'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields FIRST
      if (!formData.title || !formData.desc || !file || !formData.readTime) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      // 1. Upload to Cloudinary FIRST
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", file);
      cloudinaryData.append("upload_preset", "uploads");

const uploadRes = await axios.post(
  "https://api.cloudinary.com/v1_1/divixqupd/image/upload",
  cloudinaryData
).catch((err) => {
  console.log("CLOUDINARY ERROR DETAILS:", err.response?.data);
  throw err; // Rethrow to trigger catch block
});

      // 2. Create post data WITH image URL
      const postData = {
        ...formData,
        image: uploadRes.data.secure_url
      };

      // 3. Send to backend
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new 
      Error('Failed to create post');

      // Reset form PROPERLY
      setFormData({ title: '', desc: '', category: 'Adventure', readTime: '' });
      setFile(null);
      fileInput.current.value = ''; // Clear file input
      setSuccess('Post created successfully!');

    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
    <div>
      <div className={styles.adminContainer}>
        <h1 className={styles.adminTitle}>Create New Post</h1>

        <form onSubmit={handleSubmit} className={styles.adminForm}>
         

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
              type="file"
              name="image"
              ref={fileInput} // Use the ref
              onChange={(e) => setFile(e.target.files[0])}
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
         {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}

      </div>
    </div>
  );
};

export default AddPosts;