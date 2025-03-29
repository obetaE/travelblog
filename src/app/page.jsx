import React from "react";
import styles from "./home.module.css";
import Image from "next/image"
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.imgcontainer}>
        <Image src="https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_640.jpg" alt="Login Photo" fill className={styles.img} />
      </div>
      <form className={styles.login} >
        <h1>Welcome Back!!</h1>
        <span>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" placeholder="Type Your Email"/>
        </span>
        <span>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" placeholder="Type Your Password"/>
        </span>
        <button className={styles.button} >Login</button>
      </form>
    </div>
  );
}
