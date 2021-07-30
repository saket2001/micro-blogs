import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import { blogActions } from "../store/blog";

const YourBlogsPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // getting user saved blogs from db
  const user_id = useSelector((state) => state.auth.loggedInId);
  console.log(user_id);
  // loads saved blogs from db
  useEffect(() => {
    fetch("http://localhost:5000/user/getuserblog", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: user_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        // update savedBlogs
        dispatch(blogActions.updateUserBlogs(data));
        // turn of loader
        setIsLoading((prevState) => !prevState);
      });
  }, [user_id, dispatch]);

  // get saved blogs from redux
  const { blogList, UserBlogs } = useSelector((state) => state.blog);
  let userBlogsList = [];
  // constructing saved blogs
  UserBlogs.forEach((Blog) => {
    userBlogsList.push(...blogList.filter((blog) => blog._id === Blog.id));
  });

  let content = <BlogList blogs={userBlogsList} />;
  if (userBlogsList.length === 0)
    content = (
      <Fragment>
        <h1>No Blogs Created yet</h1>
        <p>
          Create your first blog now and see who people react to your writing.
        </p>
      </Fragment>
    );

  if (isLoading) content = <div className="loading-spinner"></div>;

  return (
    <Fragment>
      <Head>
        <title>Your Blogs</title>
      </Head>
      <main>
        {!isLoading && userBlogsList.length > 0 && (
          <h1>Blogs Created By You</h1>
        )}
        {content}
      </main>
    </Fragment>
  );
};

export default YourBlogsPage;
