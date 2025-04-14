import Image from 'next/image';
import NewsletterForm from '@/components/NewsletterForm/NewsletterForm';
import Interaction from '@/components/Interaction/Interaction';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96">
        <Image
          src="https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Cassie backpacking through mountains"
          fill
          className="object-cover"
        />
        <div className="relative z-10 flex items-center justify-center h-full bg-black/40">
          <div className="text-center text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              More Than Just Travel
            </h1>
            <p className="text-xl">
              Building bridges between cultures, one story at a time
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        {/* Introduction Section */}
        <section className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="md:w-1/3 relative h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Cassie smiling at a local market"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6">Hey, I'm Cassie!</h2>
            <p className="text-gray-600 mb-4">
              What began as a solo backpacking trip through Southeast Asia in 2018 
              transformed into a lifelong passion for authentic storytelling. I'm not 
              your typical travel influencer - you won't find me posing at luxury 
              resorts or promoting tourist traps. My heart beats for the raw, 
              unfiltered moments that travel reveals.
            </p>
            <p className="text-gray-600 mb-4">
              Through <strong>Travelling with Erill</strong>, I aim to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Showcase destinations through local perspectives</li>
              <li>Provide practical sustainable travel guides</li>
              <li>Document cultural preservation efforts</li>
              <li>Share budget-friendly adventure strategies</li>
            </ul>
            <Interaction postUrl="https://yourdomain.com/about" />
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Our Core Philosophy
          </h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            "Travel should be a bridge, not a commodity. We believe in moving 
            through the world with respect, curiosity, and a commitment to leave 
            places better than we find them. Every story shared here is a 
            testament to the incredible diversity of human experience and the 
            breathtaking beauty of our planet."
          </p>
        </section>

        {/* Journey Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-emerald-500 text-4xl font-bold mb-2">6+</div>
              <div className="text-gray-600">Years Exploring</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-emerald-500 text-4xl font-bold mb-2">54</div>
              <div className="text-gray-600">Countries Visited</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-emerald-500 text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-600">Words Written</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Get exclusive stories, behind-the-scenes content, and early access to 
            new guides straight to your inbox
          </p>
          <NewsletterForm />
        </section>
      </div>
    </div>
  );
};

export default AboutPage;