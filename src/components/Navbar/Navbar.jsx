"use client"
import React from "react"
import styles from "./Navbar.module.css"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from 'next/font/google';
import { useState } from "react"

  const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"], // Adjust weights based on your needs
  });


export default function Home(){

  const [open, setOpen] = useState(false)

  {
    /*
    Group Links:
Combine similar sections under dropdowns. For example:
"Rooms": Group "Rooms & Suites" and "Offers & Packages."
"Explore": Group "Dining & Nightlife" and "Amenities."
    */
  } 

    const navLinks = [
      {
        path: "/",
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
            <Link href="/" className={styles.book}>
              Login
            </Link>
          </div>
        </div>
        {/* SIDENAV */}
        <div className={styles.sidecontainer}>
          <div className={styles.sideNav}>
            <div className={styles.sideHead}>
              <div>
                <Link
                  href="/"
                  className={`${styles.left} ${playfairDisplay.className}`}
                >
                  Gamma Suites
                </Link>
              </div>

              <div className="flex">
                {open ? (
                  <div onClick={() => setOpen(false)} className={styles.menu}>
                    X
                  </div>
                ) : (
                  <div onClick={() => setOpen(true)} className={styles.menu}>
                    O
                  </div>
                )}
              </div>
            </div>
          </div>
            { open && <div className={styles.overlay}>
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
              <Link href="/" className={styles.book}>
                Book Now
              </Link>
            </div>}
        </div>
      </>
    );
}