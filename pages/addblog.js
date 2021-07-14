import Head from "next/head";
import { Fragment } from "react";
import AddBlog from "../components/Blog/AddBlog";

const addBlog = () => {
  return (
    <Fragment>
      <Head>
        <title>Add Blog</title>
      </Head>
      <main>
        <AddBlog />
      </main>
    </Fragment>
  );
};

export default addBlog;
