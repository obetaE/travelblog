import styles from "./postUser.module.css";
import Image from "next/image";


const PostUser = () => {


  return (
    <div className={styles.container}>
      <div className={styles.img}>
      <Image
        className={styles.avatar}
        // the bottom line means that if user exists show the img if it doesnt then show the no avatar image
        src={"https://cdn.pixabay.com/photo/2022/12/02/03/31/girl-7630188_640.jpg" || "/noavatar.png"}
        alt=""
        fill
      />
      </div>
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>Mia Hailey</span>
      </div>
    </div>
  );
};

export default PostUser;