import Image from "next/image"
import styles from "./BlogPost.module.css"
import Link from "next/link"

const BlogPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image src="https://cdn.pixabay.com/photo/2021/07/31/12/26/plane-6511878_640.jpg" alt="Blog Image" fill className={styles.img}/>
        <h1 className={styles.title}> My First Post </h1>
        <span className={styles.date}> 01.01.2024 </span>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eaque pariatur tempore, asperiores placeat quae vel consequatur praesentium? Ex, necessitatibus?
        </p>
        <Link className={styles.link} href={`/blog/blog1`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default BlogPost