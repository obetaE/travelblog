import BlogPost from "@/components/BlogPost/BlogPost";
import styles from "./blog.module.css";


const BlogPage = async () => {

  return (
    <div className={styles.container}>
        <div className={styles.post}>
          <BlogPost />
        </div>
    </div>
  );
};

export default BlogPage;
