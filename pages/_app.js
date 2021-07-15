import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import { Fragment } from "react-is";
import { Provider } from "react-redux";
import store from "../store/index";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Fragment>
        <Head>
          <html lang="en"></html>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
            integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="shortcut icon"
            href="../../public/blog-solid.svg"
            type="image/x-icon"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </Provider>
  );
}

export default MyApp;
