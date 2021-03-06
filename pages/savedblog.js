import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import { blogActions } from "../store/blog";

const SavedBlogsPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // getting user saved blogs from db
  const user_id = useSelector((state) => state.auth.loggedInId);
  // loads saved blogs from db
  useEffect(() => {
    fetch(" https://micro-blog-api.herokuapp.com/user/getuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: user_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        // update savedBlogs
        dispatch(blogActions.updateSavedBlogs(data.savedBlogs));
        // turn of loader
        setIsLoading((prevState) => !prevState);
      });
  }, [user_id, dispatch]);

  // get saved blogs from redux
  const { blogList, savedBlogs } = useSelector((state) => state.blog);
  let savedBlogsList = [];
  // constructing saved blogs
  savedBlogs.forEach((Blog) => {
    savedBlogsList.push(...blogList.filter((blog) => blog._id === Blog.id));
  });

  let content = <BlogList blogs={savedBlogsList} isBookmarked={true} />;
  if (savedBlogsList.length === 0)
    content = (
      <Fragment>
        <h1>No Bookmarks Created yet</h1>
        <p>
          Read some interesting blogs and save them or else save blogs so you
          can read them later
        </p>
      </Fragment>
    );

  if (isLoading) content = <div className="loading-spinner"></div>;

  return (
    <Fragment>
      <Head>
        <title>Saved Blogs</title>
      </Head>
      <main>
        {!isLoading && savedBlogsList.length > 0 && <h1>Blogs Saved By You</h1>}
        {content}
      </main>
    </Fragment>
  );
};

export default SavedBlogsPage;
