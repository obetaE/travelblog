import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Join Our NewsLetter</p>
        <form className={styles.subscribe}>
          <input type="email" placeholder="Enter your email"></input>
          <button className={styles.button}>Subscribe</button>
        </form>
      </div>
      <div className={styles.bottom}>
       
                <Link href="/" className={styles.links}>
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Instagram_iccqog.png"
                    alt="Instagram"
                    fill
                    className={styles.img}
                  />
                </Link>
               <Link
                  href="/"
                  className={styles.links}
                >
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Facebook_hdstbv.png"
                    alt="Facebook"
                    width={50}
                    height={70}
                    className={styles.img}
                  />
                </Link>
              
                <Link href="/" className={styles.links}>
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1737677762/Untitled_design_5_jvxoou.png"
                    alt="whatsapp"
                    width={25}
                    height={25}
                    className={styles.img}
                  />
                </Link>
              
                <Link
                  href="/"
                  className={styles.links}
                >
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Twitter_nk36mk.png"
                    alt="Twitter"
                    width={20}
                    height={20}
                    className={styles.img}
                  />
                </Link>
              <span className={styles.follows}>Follow Us On Our Socials</span>
      </div>
    </div>
  );
};

export default Footer;
