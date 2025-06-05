import React from "react";
import Link from "next/link";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.animation}>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
        </div>
        <Link href="/homepage" className={styles.homeButton}>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;