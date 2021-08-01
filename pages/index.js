import Head from "next/head";
import Image from "next/dist/client/image";
import img from "../public/index.svg";
import router from "next/router";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import SearchBar from "../components/SearchBar/SearchBar";
import { blogActions } from "../store/blog";

export default function Home(props) {
  let isLoading = true;
  //
  const dispatch = useDispatch();
  // for search query
  const [searchQuery, setSearchQuery] = useState("");

  // for auth state
  const isLoggedIn = useSelector((state) => state.auth.authStatus);

  // get blogs
  let blogList = props.blogsList ? Object.values(props.blogsList) : [];
  let newSearchedBlog = useSelector((state) => state.blog.searchedBlog);

  // updates blogLists
  dispatch(blogActions.updateBlogs(blogList));
  isLoading = false;

  if (blogList.length === 0)
    return (
      <div className="loading">
        <Image alt="" src={img} width="400px" height="360px" />
        <p>No Blogs Found!</p>
      </div>
    );

  const searchBlog = (query) => {
    // turn on loading
    setIsLoading((prevState) => !prevState);
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
      // turn off loading
      setIsLoading((prevState) => !prevState);
    }
  };

  // check if logged in else go to sign in page
  if (isLoggedIn) {
    return router.replace("/signin");
  }

  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        {isLoading && <div className="loading-spinner"></div>}
        {!isLoading && (
          <div className="blog_head">
            <i className="fa fa-quote-left" aria-hidden="true"></i>
            <p>
              A reader lives a thousand lives before he dies <span>-Jojen</span>
            </p>
            <i className="fa fa-quote-right" aria-hidden="true"></i>
          </div>
        )}
        {!isLoading && <SearchBar addSearchQuery={searchBlog} />}
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
    revalidate: 2,
  };
}
