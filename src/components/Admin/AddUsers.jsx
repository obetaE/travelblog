"use client"
import React from "react";
import styles from "./styles/AddUser.module.css";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AddUsers(){
    const [fullname, setFullname] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [confirmpassword, setConfirmpassword] = useState("")
        const [isAdmin, setIsAdmin] = useState(false)
        const [success, setSuccess] = useState("")
        const [error, setError] = useState("")
        const [showPassword, setShowPassword] = useState(false);
        const [isSubmitting, setIsSubmitting] = useState(false);

        
            const handleSubmit = async (e) => {
                e.preventDefault();
        
                setIsSubmitting(true)
        
                if (!fullname || !email || !password || !confirmpassword) {
                    setError("All Fields Are Necessary");
                    setIsSubmitting(false);
                    return;
                }
        
                if (password !== confirmpassword) {
                    setError("Passwords do not match");
                    setIsSubmitting(false);
                    return;
                }
        
                try {
        
                    const resUserCheck = await fetch('api/userExists',{ 
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify({ email })
                    }
                    )
        
                    const { user } = await resUserCheck.json();
                    
                    if (user) {
                        setError("User Already Exists");
                        setIsSubmitting(false);
                        return
                    }
        
        
        
                    const res = await fetch('api/register' , {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            fullname, email, password, isAdmin
                        })
                    })
        
                    if (res.ok) {
                      // Reset all states properly
                      setFullname("");
                      setEmail("");
                      setPassword("");
                      setConfirmpassword("");
                      setIsAdmin(false);
                      setShowPassword(false);
                      setError("");
                      setSuccess("User Successfully Registered");
                    } else{
                        console.log("User Registration Failed")
                    }
                } catch (error) {
                        console.log("Error During Registration", error)
                } finally {
                    setIsSubmitting(false);
                }
        
                
            };

            return (
              <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.header}>
                    <h1>Join Our Community</h1>
                    <p className={styles.subtitle}>
                      Create your account to start exploring
                    </p>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      onChange={(e) => setFullname(e.target.value)}
                      type="text"
                      name="fullname"
                      id="fullname"
                      className={styles.inputField}
                      placeholder="FullName"
                    />
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
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <Eye size={20} className={styles.eyeIcon} />
                        ) : (
                          <EyeOff size={20} className={styles.eyeIcon} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className={styles.passwordWrapper}>
                      <input
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        name="confirmpassword"
                        id="confirmpassword"
                        className={styles.inputField}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <Eye size={20} className={styles.eyeIcon} />
                        ) : (
                          <EyeOff size={20} className={styles.eyeIcon} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="isAdmin">Admin Privileges</label>
                    <select
                      name="isAdmin"
                      id="isAdmin"
                      value={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.value === "true")}
                      className={styles.inputField}
                    >
                      <option value="false">Regular User</option>
                      <option value="true">Admininstrator</option>
                    </select>
                  </div>

                  <button className={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>

                  {error && (
                    <div className={styles.error}>
                      <span>⚠</span> {error}
                    </div>
                  )}
                  {success && (
                    <div className={styles.success}>
                      <span>✓</span> {success}
                    </div>
                  )}
                </form>
              </div>
            );
        
}