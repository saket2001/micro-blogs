import styles from "./addblog.module.css";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../../store/blog";
import { useRouter } from "next/router";
// import uuid from "react-uuid";

const AddBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const authorId = useSelector((state) => state.auth.loggedInId);

  const dispatch = useDispatch();
  const inputTitle = useRef();
  const inputAuthor = useRef();
  const inputImage = useRef();
  const inputDescription1 = useRef();
  const inputDescription2 = useRef();
  const inputDescription3 = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading((prevState) => !prevState);
    // collecting data
    const date = Intl.DateTimeFormat("en-us").format(new Date());

    const data = {
      title: inputTitle.current.value.toString(),
      author: inputAuthor.current.value.toString(),
      authorId: authorId.toString(),
      image:
        inputImage.current.value.toString() ||
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      description: {
        description1: inputDescription1.current.value.toString(),
        description2: inputDescription2.current.value.toString() || "",
        description3: inputDescription3.current.value.toString() || "",
      },
      publishedDate: date.toString(),
    };
    // adding to db

    const res = await fetch(
      "https://micro-blog-api.herokuapp.com/microblogs/addblog",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const resData = await res.json();
    console.log(resData);

    alert(resData.message);
    if (resData.type) {
      dispatch(blogActions.addBlog(data));
      router.push("/");
    }
  };

  return (
    <Fragment>
      {isLoading && <div className="loading-spinner"></div>}
      {!isLoading && (
        <form className={styles.blog_form} onSubmit={submitHandler}>
          <div className={styles.form__head}>
            <h1>Add New Blog</h1>
            <p>We love receiving new blogs from you.</p>
            <p>Help other by providing them good content to read daily.</p>
          </div>
          <div className={styles.form__body}>
            <div className={styles.form__item}>
              <label htmlFor="title">Blog Title</label>
              <input
                className="form__input"
                type="text"
                id="title"
                ref={inputTitle}
                required
              />
            </div>
            <div className={styles.form__item}>
              <label htmlFor="author">Blog Author</label>
              <input
                className="form__input"
                type="text"
                id="author"
                ref={inputAuthor}
                required
              />
            </div>

            <div className={styles.form__item}>
              <label htmlFor="description">Blog Description</label>
              <p className={styles.small_text}>
                ( Begin new line on new paragraph )
              </p>
              <textarea
                rows="20"
                cols="50"
                id="description"
                aria-expanded="true"
                placeholder="Paragraph 1"
                ref={inputDescription1}
              ></textarea>
            </div>
            <div className={styles.form__item}>
              <textarea
                rows="20"
                cols="50"
                id="description"
                aria-expanded="true"
                placeholder="Paragraph 2"
                ref={inputDescription2}
              ></textarea>
            </div>
            <div className={styles.form__item}>
              <textarea
                rows="20"
                cols="50"
                id="description"
                aria-expanded="true"
                placeholder="Paragraph 3"
                ref={inputDescription3}
              ></textarea>
            </div>
            <div className={styles.form__item}>
              <label htmlFor="image">Blog Image</label>
              <input
                className="form__input"
                type="text"
                id="image"
                ref={inputImage}
                placeholder="Image url"
              />
            </div>
            <div className={styles.form__action}>
              <button type="submit" className={styles.submit_btn}>
                Submit Blog
              </button>
            </div>
          </div>
        </form>
      )}
      ;
    </Fragment>
  );
};

export default AddBlog;
