"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/AddPosts.module.css";
import axios from "axios";
import "quill/dist/quill.snow.css";

const AddPosts = () => {
  const editorRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const [desc, setDesc] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "Adventure",
    readTime: "",
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // New state for preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPreview, setShowPreview] = useState(false); // Preview modal state
  const fileInput = useRef();

  const categories = ["Adventure", "Culture", "Food", "Sustainable Travel"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Quill = require("quill").default;

      const Font = Quill.import("formats/size");
      Font.whitelist = ["small", "normal", "large", "huge"];
      Quill.register(Font, true);

      const quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      quillInstanceRef.current = quillInstance;
      quillInstance.on("text-change", () => {
        setDesc(quillInstance.root.innerHTML);
      });
    }
  }, []);

  // Handle file selection and create preview URL
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Create preview URL
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  // Clear preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const clearEditor = () => {
    if (quillInstanceRef.current) {
      const quill = quillInstanceRef.current;
      quill.setContents([]);
      setDesc("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!formData.title.trim()) {
        setError("Title is required");
        setLoading(false);
        return;
      }

      if (!desc || desc === "<p><br></p>") {
        setError("Description is required");
        setLoading(false);
        return;
      }

      if (!file) {
        setError("Image is required");
        setLoading(false);
        return;
      }

      if (!formData.readTime.trim()) {
        setError("Read time is required");
        setLoading(false);
        return;
      }

      const cloudinaryData = new FormData();
      cloudinaryData.append("file", file);
      cloudinaryData.append("upload_preset", "uploads");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/divixqupd/image/upload",
        cloudinaryData
      );

      const postData = {
        ...formData,
        desc,
        image: uploadRes.data.secure_url,
      };

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      setFormData({
        title: "",
        category: "Adventure",
        readTime: "",
      });
      clearEditor();
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      if (fileInput.current) fileInput.current.value = "";
      setSuccess("Post created successfully!");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
            <div ref={editorRef} className={styles.editorContainer} />
            <button
              type="button"
              className={styles.button}
              onClick={clearEditor}
            >
              Clear Editor
            </button>
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Image</label>
            <input
              type="file"
              name="image"
              ref={fileInput}
              onChange={handleFileChange} // Updated handler
              required
              accept="image/*"
            />
            {previewUrl && (
              <button
                type="button"
                className={styles.previewButton}
                onClick={() => setShowPreview(true)}
              >
                Preview Image
              </button>
            )}
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
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
      </div>

      {/* Preview Modal */}
      {showPreview && previewUrl && (
        <div className={styles.previewModal}>
          <div className={styles.previewContent}>
            <div className={styles.previewHeader}>
              <h2>Image Preview</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowPreview(false)}
              >
                &times;
              </button>
            </div>
            
            <div className={styles.previewCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className={styles.previewImage}
                />
                <div className={styles.imageOverlay} />
              </div>
              
              <div className={styles.previewDetails}>
                <div className={styles.previewMeta}>
                  <span className={styles.previewDate}>
                    {new Date().toLocaleDateString()}
                  </span>
                  <span className={styles.previewReadTime}>
                    {formData.readTime || "Preview read time"}
                  </span>
                </div>
                
                <h3 className={styles.previewTitle}>
                  {formData.title || "Your post title will appear here"}
                </h3>
                
                <div className={styles.previewCategory}>
                  {formData.category || "Category"}
                </div>
              </div>
            </div>
            
            <p className={styles.previewNote}>
              This is how your post will appear on the blog page
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPosts;