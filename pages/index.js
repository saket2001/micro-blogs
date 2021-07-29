import Head from "next/head";
import router from "next/router";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import SearchBar from "../components/SearchBar/SearchBar";
import { blogActions } from "../store/blog";

export default function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  // for auth state
  const isLoggedIn = useSelector((state) => state.auth.authStatus);
  const LoggedInId = useSelector((state) => state.auth.loggedInId);
  // for blogs
  let isLoading = useSelector((state) => state.isLoading);
  let newSearchedBlog = useSelector((state) => state.blog.searchedBlog);
  let blogList = props.blogsList ? Object.values(props.blogsList) : [];

  // updates blogLists
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

  if (isLoggedIn) {
    return router.replace("/signin");
  }

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
            isBookmarked={false}
          />
        )}
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://micro-blog-api.herokuapp.com/microblogs/allblogs"
  );

  const data = await response.json();

  return {
    props: { blogsList: data },
    revalidate: 10,
  };
}
