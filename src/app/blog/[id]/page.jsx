import Image from "next/image";
import styles from "./post.module.css";
import PostUser from "@/components/postUser/postUser";


const SinglePostPage = async () => {

  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image src="https://cdn.pixabay.com/photo/2021/07/31/12/26/plane-6511878_640.jpg" alt="" fill className={styles.img} />
        </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>First Post</h1>
        <div className={styles.detail}>
              <PostUser />

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {/* showing the date it was created and adding tostring to prevent it fro being an object date */}
              {/* {post.createdAt.toString().slice(4, 16)} */}
              {`12-06-2024`}
            </span>
          </div>
        </div>
        <div className={styles.content}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem ipsa, quod sequi mollitia alias numquam aliquam tempore ratione neque quae fugiat aspernatur nihil at eveniet sint pariatur quia. Soluta quaerat nesciunt atque eum accusamus assumenda omnis voluptatem officia ipsam odio voluptatibus corrupti, aspernatur nulla doloremque quo, molestiae hic repudiandae ullam.</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
