"use client"
import React from "react"
import styles from "./Navbar.module.css"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from 'next/font/google';
import { useState } from "react"
import MobileNav from "./MobileNav";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

  const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"], // Adjust weights based on your needs
  });


export default function Home(){

  const {data: session} = useSession();

    const navLinks = [
      {
        path: "/homepage",
        title: "Home",
      },
      {
        path: "/blog",
        title: "Blog",
      },
      {
        path: "/about",
        title: "About",
      },
      {
        path: "/contact",
        title: "Contact Us",
      },
    ];
      const pathName = usePathname();
    return (
      <>
        <div className={styles.container}>
          <Link
            href="/"
            className={`${styles.left} ${playfairDisplay.className}`}
          >
            Travelling with Eri!!!
          </Link>
          <div className={styles.right}>
            {navLinks.map((links) => (
              <Link
                key={links.path}
                href={links.path}
                className={`${styles.links} ${
                  pathName === links.path && styles.active
                }`}
              >
                {links.title}
              </Link>
            ))}
            {session?.user ? (
              <button onClick={() => signOut()} className={styles.book}>Logout</button>
            ):(
              <Link href="/" className={styles.book}>
              Login
            </Link>
            )}

            
          </div>
        </div>
        {/* SIDENAV */}
        <div className={styles.sidecontainer}>
          <MobileNav/>
          
        </div>
      </>
    );
}