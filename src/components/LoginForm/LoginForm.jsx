"use client"
import React from "react";
import styles from "./home.module.css";
import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";


export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const res = await signIn('credentials', { 
          email, 
          password, 
          redirect: false, 
        });

        if (res.error) {
          setError("Invalid Credentials");
          return;
        }

        router.replace("homepage")
    } catch (error){
      console.log(error)
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgcontainer}>
        <Image
          src="https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_640.jpg"
          alt="Login Photo"
          fill
          className={styles.img}
          priority
        />
        <div className={styles.imageOverlay} />
      </div>

      <form onSubmit={handleSubmit} className={styles.login}>
        <div className={styles.header}>
          <h1>Welcome Back!</h1>
          <p className={styles.subtitle}>Sign in to continue your creative journey</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className={styles.inputField}
            placeholder="your@email.com"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={styles.inputField}
              placeholder="••••••••"
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <Eye size={20} className={styles.eyeIcon} />
              ) : (
                <EyeOff size={20} className={styles.eyeIcon} />
              )}
            </button>
          </div>
        </div>

        <button className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        {error && <div className={styles.error}><span>⚠</span> {error}</div>}
        {success && <div className={styles.success}><span>✓</span> {success}</div>}

        <p className={styles.registerPrompt}>
          New here? <Link href="/register" className={styles.registerLink}>Create an account</Link>
        </p>
      </form>
    </div>
  );
}
