import styles from "./detailedblog.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const DetailedBlog = () => {
  const router = useRouter();
  const blogId = router.query.blogId;

  const blogList = useSelector((state) => state.blog.blogList);

  const [currentBlog] = blogList.filter((blog) => blog._id === blogId);

  if (!currentBlog) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.blog}>
      <div className={styles.blog__head}>
        <div className={styles.blog__image}>
          <Image
            src={currentBlog.image}
            width={200}
            height={180}
            alt="blog image"
          />
        </div>
        <div className={styles.blog__head__text}>
          <div className={styles.blog__title}>{currentBlog.title}</div>
          <div className={styles.blog__information}>
            <div className={styles.blog__info}>
              published on -{" "}
              <span className={styles.highlighted}>
                {currentBlog.publishedDate}
              </span>
            </div>
            <div className={styles.blog__info}>
              Author -{" "}
              <span className={styles.highlighted}>{currentBlog.author}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.blog__description}>
        {currentBlog.description.description1}
      </div>
      <div className={styles.blog__description}>
        {currentBlog.description.description2}
      </div>
      <div className={styles.blog__description}>
        {currentBlog.description.description3}
      </div>
    </div>
  );
};

export default DetailedBlog;
