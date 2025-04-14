"use client"

import Image from 'next/image';
import Interaction from '@/components/Interaction/Interaction';
import NewsletterForm from '@/components/NewsletterForm/NewsletterForm';

const BlogPost = () => {

  const post = {
    
    title: 'Hiking the Inca Trail to Machu Picchu',
    content: `<p>Lorem ipsum dolor sit amet...</p>`, // Use dangerouslySetInnerHTML carefully
    date: '2024-03-15',
    image: 'https://images.pexels.com/photos/7026406/pexels-photo-7026406.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Adventure',
    readTime: '8 min read'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Post Header */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="mb-8">
          <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-500 mb-8">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Post Content */}
        <article 
          className="prose lg:prose-xl max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Interaction postUrl={`https://yourdomain.com/blog/${post.slug}`} />

        {/* Newsletter CTA */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold mb-4">Enjoyed this post?</h2>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;