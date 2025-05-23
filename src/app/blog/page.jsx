"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from "./blog.module.css"

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
   const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const categories = ['All', 'Adventure', 'Culture', 'Food', 'Sustainable Travel'];

    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog'); // Match your API route
        if (!response.ok) throw new Error('Failed to fetch posts');
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

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }); 

  if (loading) return <div className={styles.loading}>Loading posts...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;


  return (
    <div className={styles.container}>
      <div className="min-h-screen bg-gray-50">
      {/* Blog Header */}
      <div className="bg-[url('https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center w-full relative text-white py-16 text-center">
        <div className='relative z-10'>
        <h1 className="text-4xl font-bold mb-4">Travel Stories</h1>
        <p className="text-xl">Discover authentic experiences from around the globe</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            className="flex-1 p-3 rounded-lg border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="p-3 rounded-lg border"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post._id}`}>
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination (Add logic as needed) */}
        <div className="flex justify-center gap-2 mt-12">
          {[1, 2, 3].map(page => (
            <button
              key={page}
              className="px-4 py-2 rounded-lg bg-white border hover:bg-emerald-50"
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BlogPage;