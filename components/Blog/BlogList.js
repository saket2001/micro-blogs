import styles from "./blog.module.css";
import { Fragment } from "react";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs }) => {
  const blogList = blogs.map((blog) => (
    <BlogItem
      key={blog.id}
      id={blog.id}
      title={blog.title}
      author={blog.author}
      img={blog.image}
      date={blog.date}
      description={blog.description}
    />
  ));

  if (blogList.length === 0)
    return (
      <div className="loading">
        <p>No Blogs Found!</p>
      </div>
    );

  return (
    <Fragment>
      <div className={styles.blog_head}>
        <i className="fa fa-quote-left" aria-hidden="true"></i>
        <p>
          A reader lives a thousand lives before he dies <span>-Jojen</span>
        </p>
        <i className="fa fa-quote-right" aria-hidden="true"></i>
      </div>
      <div className={styles.blog_list}>{blogList}</div>
    </Fragment>
  );
};

export default BlogList;
