import Head from "next/head";
import { Fragment } from "react";
import DetailedBlog from "../../components/Blog/DetailedBlog";

const addBlog = () => {
  return (
    <Fragment>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <DetailedBlog />
      </main>
    </Fragment>
  );
};

export default addBlog;
