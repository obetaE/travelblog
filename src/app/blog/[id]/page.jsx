"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Interaction from "@/components/Interaction/Interaction";
import NewsletterForm from "@/components/NewsletterForm/NewsletterForm";
import CommentSection from "@/components/CommentSection/CommentSection";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) throw new Error("Post not found");
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        {/* Category Skeleton */}
        <div className="mb-8">
          <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-4 mb-6">
          <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Date & Read Time Skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Image Skeleton */}
        <div className="relative h-96 mb-12 rounded-xl overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-3 mb-12">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full h-4 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse mt-6"></div>
          <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Interaction Skeleton */}
        <div className="h-12 bg-gray-200 rounded-lg mb-12 animate-pulse"></div>

        {/* Comment Section Skeleton */}
        <div className="space-y-6">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Skeleton */}
        <div className="mt-16 border-t pt-16">
          <div className="w-64 h-6 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="space-y-4">
            <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="mb-8">
          <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-500 mb-8">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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

        <article
          className="prose lg:prose-xl max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />

        <Interaction
          postUrl={`https://travelwitherii.vercel.app/blog/${post._id}`}
        />

        <CommentSection />

        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold mb-4">Enjoyed this post?</h2>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
