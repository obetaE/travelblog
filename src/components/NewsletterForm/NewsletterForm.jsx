"use client"
import React from 'react'

import { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
  <div className="flex flex-col sm:flex-row gap-2 w-full">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
      disabled={isSubmitting}
      required
    />
    <button
      type="submit"
      className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:bg-gray-400 text-sm sm:text-base whitespace-nowrap"
      disabled={isSubmitting || isSuccess}
    >
      {isSubmitting ? 'Submitting...' : 'Subscribe'}
    </button>
  </div>

      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}

      {isSuccess && (
        <p className="mt-2 text-emerald-500 text-sm">
          🎉 Thanks for subscribing! Check your inbox for confirmation.
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;