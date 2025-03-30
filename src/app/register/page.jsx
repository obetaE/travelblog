"use client"
import React from "react";
import styles from "./register.module.css";
import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";


export default function Register() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.imgcontainer}>
                <Image src="https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_640.jpg" alt="Login Photo" fill className={styles.img} />
            </div>
            <form className={styles.login} >
                <h1>New Here, Create an Account!!</h1>
                <span>
                    <label htmlFor="fullname">FullName:</label>
                    <input onChange={(e) => setFullname(e.target.value)} type="fullname" name="fullname" id="fullname" placeholder="Type Your fullname" />
                </span>
                <span>
                    <label htmlFor="email">Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Type Your Email" />
                </span>
                <span className={styles.passwordWrapper}>
                    <label htmlFor="password">Password:</label>
                    <div className={styles.passwordInput}>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Type Your Password"
                        />
                        <button
                            type="button"
                            className={styles.toggleButton}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ?
                                <Eye size={20} color="black" />   // Show icon
                                :
                                <EyeOff size={20} color="red" />  // Hide icon
                            }
                        </button>
                    </div>
                </span>
                <span className={styles.passwordWrapper}>
                    <label htmlFor="confirmpassword">Confirm Your Password:</label>
                    <div className={styles.passwordInput}>
                        <input
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            name="confirmpassword"
                            id="confirmpassword"
                            placeholder="Confirm Your Password"
                        />
                        <button
                            type="button"
                            className={styles.toggleButton}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ?
                                <Eye size={20} color="black" />   // Show icon
                                :
                                <EyeOff size={20} color="red" />  // Hide icon
                            }
                        </button>
                    </div>
                </span>
                <button className={styles.button} >Register</button>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <Link className={styles.account} href="/">
                    Already Have an Account? <span>Login</span>
                </Link>
            </form>
        </div>
    );
}
