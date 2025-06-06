"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./blog.module.css";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "All",
    "Adventure",
    "Culture",
    "Food",
    "Sustainable Travel",
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Loading component with book flipping animation
  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.book}>
          <div className={styles.cover}>
            <div className={styles.coverTitle}>Travel Stories</div>
            <div className={styles.coverSubtitle}>Loading adventures...</div>
          </div>

          {/* Pages */}
          <div className={`${styles.page} ${styles.page1}`}>
            <div className={styles.pageContent}>
              <h3>Norwegian Fjords</h3>
              <p>Hiking through majestic landscapes...</p>
            </div>
          </div>
          <div className={`${styles.page} ${styles.page2}`}>
            <div className={styles.pageContent}>
              <h3>Bangkok Street Food</h3>
              <p>Tasting exotic flavors...</p>
            </div>
          </div>
          <div className={`${styles.page} ${styles.page3}`}>
            <div className={styles.pageContent}>
              <h3>Moroccan Desert</h3>
              <p>Camping under starry skies...</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={styles.error}>
        <span>Error: {error}</span>
      </div>
    );

  return (
    <div className={styles.container}>
      {/* Blog Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Travel Stories</h1>
          <p className={styles.subtitle}>
            Discover authentic experiences from around the globe
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchGroup}>
          <input
            type="text"
            placeholder="Search posts..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className={styles.categorySelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className={styles.postsGrid}>
        {filteredPosts.map((post) => (
          <article key={post._id} className={styles.postCard}>
            <Link href={`/blog/${post._id}`} className={styles.postLink}>
              <div className={styles.imageContainer}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={styles.postImage}
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.postContent}>
                <div className={styles.postMeta}>
                  <span className={styles.postDate}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <span className={styles.postCategory}>{post.category}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {[1, 2, 3].map((page) => (
          <button key={page} className={styles.paginationButton}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
