import React from 'react'
import styles from "./homepage.module.css"
import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from '@/components/NewsletterForm/NewsletterForm';


const HomePage = () => {
  const featuredPosts = [
    { id: 1, title: "Hiking the Norwegian Fjords", category: "Adventure", image: "https://media.istockphoto.com/id/1392494719/photo/woman-with-pink-suitcase-and-passport-with-boarding-pass-standing-on-passengers-ladder-of.jpg?s=612x612&w=0&k=20&c=MVUZvIdaUmvRKdG-B5EEGGkIVFj51jss-b6IkxqY3fg=" },
    { id: 2, title: "Street Food Tour in Bangkok", category: "Food", image: "https://media.istockphoto.com/id/1368808461/photo/young-woman-feeding-fish-on-tropical-beach.jpg?s=612x612&w=0&k=20&c=qIdzSEI3BQvGliysV65R5NzHGuhX_4Mq_PU7nBhhsBQ=" },
    { id: 3, title: "Desert Camping in Morocco", category: "Culture", image: "https://media.istockphoto.com/id/1434054606/photo/traveler-backpacker-girl-is-watching-hot-air-balloons-and-the-fairy-chimneys-at-cappadocia.jpg?s=612x612&w=0&k=20&c=Ojnh3lIVszkgDRA9l7U2dvxBWUeORsEhdsyVq5Yjbmw=" },
  ];

  return (
    <div className={styles.container}>
      <div className="min-h-screen bg-gray-50">
      {/* --- Hero Section --- */}
      <section className="relative h-[70vh]">
        <Image 
          src="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Mountain landscape at sunrise" 
          fill
          className="object-cover"
        />
        <div className="relative z-10 flex items-center justify-center h-full bg-black/40">
          <div className="text-center text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Wander Beyond the Map
            </h1>
            <p className="text-xl mb-8">
              Discovering hidden gems and sharing authentic travel stories from every corner of the globe
            </p>
            <Link href="/blog" className="bg-emerald-500 text-white px-8 py-3 rounded-full hover:bg-emerald-600 transition">
              Explore Stories
            </Link>
          </div>
        </div>
      </section>

      {/* --- Featured Posts --- */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Adventures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredPosts.map((post) => (
            <article key={post.id} className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image 
                src={post.image} 
                alt={post.title} 
                width={600} 
                height={400}
                className="object-cover h-64 transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-emerald-400 text-sm">{post.category}</span>
                <h3 className="text-white text-xl font-bold">{post.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Traveler's Corner --- */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative h-96 rounded-xl overflow-hidden">
            <Image 
              src="https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=600"              alt="Cassie hiking" 
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Meet the Traveler</h2>
            <p className="text-gray-600 mb-6">
              I'm Cassie, a full-time wanderer and storyteller. What began as solo backpacking trips 
              evolved into a lifelong passion for authentic cultural immersion. Join me as I explore 
              offbeat trails, connect with local communities, and document the raw beauty of our world.
            </p>
            <Link href="/about" className="text-emerald-500 font-semibold hover:text-emerald-600">
              Read My Story →
            </Link>
          </div>
        </div>
      </section>

      {/* --- Newsletter CTA --- */}
      <section className="bg-emerald-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Adventure</h2>
          <p className="text-gray-600 mb-8">
            Get weekly travel stories, exclusive guides, and packing tips straight to your inbox
          </p>
          <NewsletterForm />
        </div>
      </section>

      
    </div>
    </div>
  );
};

export default HomePage;
