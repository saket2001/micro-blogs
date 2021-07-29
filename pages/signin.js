import Head from "next/head";
import { Fragment } from "react";
import SignIn from "../components/Auth Form/SignIn";

const AuthPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Sign in</title>
      </Head>
      <SignIn />
    </Fragment>
  );
};

export default AuthPage;
