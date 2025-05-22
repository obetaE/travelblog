'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiUser, FiBook, FiMail, FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/navigation';


import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"

const MobileNav = () => {

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () =>{
    toggleMenu();
    signOut();
    router.push("/")
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/homepage', icon: <FiHome /> },
    { name: 'About', path: '/about', icon: <FiUser /> },
    { name: 'Blog', path: '/blog', icon: <FiBook /> },
    { name: 'Contact Us', path: '/contact', icon: <FiMail /> },
  ];

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-700 hover:text-emerald-500 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          {/* Menu container */}
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg">
            <div className="flex flex-col h-full p-4">
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-700 hover:text-emerald-500"
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 mt-8">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        onClick={toggleMenu}
                        className="flex items-center p-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li >
                    {session?.user ? (
                      <button 
                      onClick={handleLogout} 
                      className="flex items-center p-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">
                        <span className="mr-3 text-lg"><FiLogIn /> </span>
                        <span className="font-medium">Logout</span>
                        </button>
                    ) : (
                      <Link
                        href="/"
                        onClick={toggleMenu}
                        className="flex items-center p-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                      >
                        <span className="mr-3 text-lg"><FiLogIn /> </span>
                        <span className="font-medium">Login</span>
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>

              {/* Footer/branding */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Travelling with Eri!!!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;