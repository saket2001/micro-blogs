import Image from "next/image";
import styles from "./blog.module.css";
import { useRouter } from "next/router";
import img from "../../public/ribbon.png";
import bookmark from "../../public/bookmark.png";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../store/blog";

const BlogItem = (props) => {
  const u_id = useSelector((state) => state.auth.loggedInId);
  const dispatch = useDispatch();
  const router = useRouter();

  const saveBlogHandler = async (id) => {
    console.log(id);
    // save in db
    const res = await fetch(
      " https://micro-blog-api.herokuapp.com/microblogs/savetofavourites",
      {
        method: "POST",
        body: JSON.stringify({
          b_id: id,
          u_id: u_id,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await res.json();
    alert(data.message);
    // save to redux
    dispatch(blogActions.saveToFavorites(id));
  };

  const removeSaveBlogHandler = async (id) => {
    // save in db
    try {
      const res = await fetch(
        " https://micro-blog-api.herokuapp.com/microblogs/removefromfavourites",
        {
          method: "POST",
          body: JSON.stringify({
            b_id: id,
            u_id: u_id,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await res.json();

      alert(data.message);
      if (data.type) router.replace("/");
      // save to redux
      // dispatch(blogActions.saveToFavorites(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.blogItem} data-id={props.id}>
      <div className={styles.blog__image}>
        <Image src={props.img} width={350} height={260} alt="some image" />
      </div>
      <div className={styles.blog__title}>{props.title}</div>
      <div className={styles.blog__author}>Author- {props.author}</div>
      <div className={styles.blog__date}>Published on- {props.date}</div>
      <div className={styles.blog__button}>
        <div className={styles.blog__save__button}>
          {props.isBookmarked && (
            <Image
              onClick={() => {
                removeSaveBlogHandler(props.id);
              }}
              src={bookmark}
              alt="bookmark logo"
              width="24px"
              height="24px"
            />
          )}
          {!props.isBookmarked && (
            <Image
              onClick={() => {
                saveBlogHandler(props.id);
              }}
              src={img}
              alt="bookmark logo"
              width="24px"
              height="24px"
            />
          )}
        </div>
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
