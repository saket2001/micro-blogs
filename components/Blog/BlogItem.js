import image from "../../public/1.jpg";
import Image from "next/image";
import styles from "./blog.module.css";
import { useRouter } from "next/router";

const BlogItem = (props) => {
  const router = useRouter();
  return (
    <div className={styles.blogItem}>
      <div className={styles.blog__image}>
        <Image src={props.img} width={350} height={260} alt="some image" />
      </div>
      <div className={styles.blog__title}>{props.title}</div>
      <div className={styles.blog__author}>Author- {props.author}</div>
      <div className={styles.blog__date}>Published on- {props.date}</div>
      <div className={styles.blog__button}>
        <button
          onClick={() => {
            router.push(`/blog/${props.id}`);
          }}
        >
          View Blog
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
