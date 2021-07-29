import Head from "next/head";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import { blogActions } from "../store/blog";

const SavedBlogsPage = () => {
  const dispatch = useDispatch();

  // getting user saved blogs from db
  const user_id = useSelector((state) => state.auth.loggedInId);
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
      });
  }, [user_id]);

  // get saved blogs from redux
  const { blogList, savedBlogs } = useSelector((state) => state.blog);
  let savedBlogsList = [];
  // constructing saved blogs
  savedBlogs.forEach((Blog) => {
    savedBlogsList.push(...blogList.filter((blog) => blog._id === Blog.id));
  });

  if (savedBlogsList.length === 0)
    return (
      <main>
        <h1>No Bookmarks Created yet</h1>
        <p>
          Read some interesting blogs and save them or else save blogs so you
          can read them later
        </p>
      </main>
    );

  return (
    <Fragment>
      <Head>
        <title>Saved Blogs</title>
      </Head>
      <main>
        <BlogList blogs={savedBlogsList} isBookmarked={true} />
      </main>
    </Fragment>
  );
};

export default SavedBlogsPage;
