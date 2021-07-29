import styles from "./blog.module.css";
import { Fragment } from "react";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs, isBookmarked }) => {
  const blogList = blogs.map((blog) => (
    <BlogItem
      key={blog._id}
      id={blog._id}
      title={blog.title}
      author={blog.author}
      img={blog.image}
      date={blog.publishedDate}
      description={blog.description}
      isBookmarked={isBookmarked}
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
      <div className={styles.blog_list}>{blogList}</div>
    </Fragment>
  );
};

export default BlogList;
