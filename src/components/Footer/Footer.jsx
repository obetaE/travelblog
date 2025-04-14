import React from "react";
import Link from "next/link";
import Interaction from '@/components/Interaction/Interaction';

const Footer = () => {
  return (

      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-emerald-400 font-bold mb-4">Travelling with Erii!!</h3>
            <p className="text-sm">Authentic travel experiences since 2024</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-emerald-400">All Posts</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <Interaction postUrl="https://yourdomain.com" />
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
