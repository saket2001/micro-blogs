import Head from "next/head";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import SearchBar from "../components/SearchBar/SearchBar";
import { blogActions } from "../store";

export default function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  let isLoading = useSelector((state) => state.isLoading);
  let newSearchedBlog = useSelector((state) => state.searchedBlog);

  let blogList = props.blogsList ? Object.values(props.blogsList) : [];

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

  const searchBlog = (query) => {
    setSearchQuery(query);

    if (query.length === 0) {
      dispatch(blogActions.updateSearchedBlogs([]));
    }

    if (query) {
      newSearchedBlog = blogList.filter((blog) => {
        if (blog.title.includes(searchQuery)) {
          return blog;
        }
      });
      dispatch(blogActions.updateSearchedBlogs(newSearchedBlog));
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        {isLoading && Text}
        <div className="blog_head">
          <i className="fa fa-quote-left" aria-hidden="true"></i>
          <p>
            A reader lives a thousand lives before he dies <span>-Jojen</span>
          </p>
          <i className="fa fa-quote-right" aria-hidden="true"></i>
        </div>
        <SearchBar addSearchQuery={searchBlog} />
        {!isLoading && (
          <BlogList
            blogs={newSearchedBlog.length > 0 ? newSearchedBlog : blogList}
          />
        )}
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
