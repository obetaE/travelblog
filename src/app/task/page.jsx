// app/page.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 ">
      {/* Navigation */}
      <nav className="bg-orange-900/30 backdrop-blur-sm sticky top-0 z-50 pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-orange-400" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-orange-300">Verve Digital</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link href="/products" className="text-orange-100 hover:text-white px-3 py-2 text-lg font-medium">
                  Products
                </Link>
                <Link href="/about" className="text-orange-100 hover:text-white px-3 py-2 text-lg font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-orange-100 hover:text-white px-3 py-2 text-lg font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[url('/cd.png')] relative bg-cover bg-center">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-orange-100 mb-8 leading-tight">
              Experience Timeless Rock Music<br/>
              <span className="text-orange-400">Curated for Discerning Listeners</span>
            </h1>
            <p className="mt-6 text-xl text-orange-100 max-w-3xl mx-auto">
              Worldwide distribution of authentic rock classics with uncompromising quality and 
              senior-friendly customer support
            </p>
            <div className="mt-10">
              <Link href="/products" className="bg-orange-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-orange-600 transition-colors duration-200">
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-orange-300 mb-16">Featured Classics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {['70s Rock Anthology', 'Golden Era Live Recordings', 'Legendary Studio Sessions'].map((title, idx) => (
              <div key={idx} className="bg-gray-700 rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300">
                <div className="aspect-square bg-orange-900/20 rounded-lg mb-4 relative">
                <Image src="https://images.pexels.com/photos/325811/pexels-photo-325811.jpeg?auto=compress&cs=tinysrgb&w=600" alt="record" fill className='object-cover'/></div>
                <h3 className="text-xl font-semibold text-orange-200 mb-2">{title}</h3>
                <p className="text-orange-100 mb-4">Digitally remastered with premium audio quality</p>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 text-lg">
                  Add to Collection - $29.99
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {title: 'Global Shipping', text: 'Reliable worldwide delivery to your doorstep'},
              {title: 'Senior Support', text: 'Dedicated phone support team available 24/7'},
              {title: 'Quality Guarantee', text: '100% authentic recordings, money-back promise'}
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-orange-900/20 rounded-xl">
                <div className="text-orange-400 text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-orange-200 mb-4">{feature.title}</h3>
                <p className="text-orange-100 text-lg">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-300 mb-4">Personalized Assistance</h2>
            <p className="text-orange-100 text-xl max-w-2xl mx-auto">
              Our dedicated support team is ready to help with any inquiries
            </p>
          </div>
          <div className="max-w-2xl mx-auto bg-gray-700 rounded-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-orange-200 text-lg mb-2">Full Name</label>
                <input type="text" className="w-full p-4 rounded-lg bg-gray-600 text-orange-100 text-lg" />
              </div>
              <div>
                <label className="block text-orange-200 text-lg mb-2">Email Address</label>
                <input type="email" className="w-full p-4 rounded-lg bg-gray-600 text-orange-100 text-lg" />
              </div>
              <div>
                <label className="block text-orange-200 text-lg mb-2">Message</label>
                <textarea rows="4" className="w-full p-4 rounded-lg bg-gray-600 text-orange-100 text-lg"></textarea>
              </div>
              <button className="w-full bg-orange-600 text-white py-4 rounded-lg text-xl hover:bg-orange-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900/20 text-orange-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-orange-300 text-xl font-bold mb-4">Verve Digital</h3>
              <p className="text-sm">Preserving rock heritage since 1998</p>
            </div>
            <div>
              <h4 className="text-orange-300 text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="hover:text-orange-400">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-300 text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li>24/7 Support: 1-800-ROCK-123</li>
                <li>Email: help@vervedigital.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-300 text-lg mb-4">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Your email" className="p-2 rounded-l-lg flex-1 bg-gray-700" />
                <button className="bg-orange-600 px-4 py-2 rounded-r-lg hover:bg-orange-700">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-900 text-center">
            <p>&copy; 2024 Verve Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}