import Head from "next/head";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import { blogActions } from "../store";

export default function Home(props) {
  const dispatch = useDispatch();
  let isLoading = useSelector((state) => state.isLoading);
  const blogList = props.blogsList ? Object.values(props.blogsList) : [];

  dispatch(blogActions.updateBlogs(blogList));

  isLoading = false;

  let Text = (
    <div className="loading">
      <p>Loading..</p>
    </div>
  );

  if (blogList.length === 0)
    Text = (
      <div className="loading">
        <p>No Blogs Found!</p>
      </div>
    );

  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        {isLoading && Text}
        {!isLoading && <BlogList blogs={blogList} />}
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://micro-blogs-18b83-default-rtdb.firebaseio.com/blogs.json"
  );

  const data = await response.json();

  return {
    props: { blogsList: data },
    revalidate: 10,
  };
}
