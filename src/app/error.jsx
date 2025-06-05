// app/error.jsx
"use client";
import React from "react";
import Link from "next/link";
import styles from "./Error.module.css";

const Error = ({ error, reset }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorIcon}>⚠️</div>
        <h1 className={styles.title}>Something Went Wrong</h1>

        <div className={styles.errorDetails}>
          <p className={styles.message}>
            {error.message || "An unexpected error occurred"}
          </p>
          <p className={styles.suggestion}>
            Try refreshing the page or returning to the homepage
          </p>
        </div>

        <div className={styles.actions}>
          <button onClick={reset} className={styles.retryButton}>
            Try Again
          </button>
          <Link href="/" className={styles.homeButton}>
            Go to Homepage
          </Link>
        </div>

        <div className={styles.animation}>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
