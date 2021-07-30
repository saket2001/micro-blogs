import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import styles from "../Blog/addblog.module.css";

const SignIN = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  // sign in or sign up
  const [state, setState] = useState(authState.authState);

  const inputName = useRef();
  const inputPassword = useRef();
  const inputEmail = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    // start loader
    setIsLoading((prevState) => !prevState);
    //check inputs
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    if (state === "sign-up") {
      const name = inputName.current.value;
      // sign up
      const res = await fetch(
        "https://micro-blog-api.herokuapp.com/user/usersignup",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            password: password,
            email: email,
          }),
        }
      );
      const data = await res.json();

      alert(data.message);

      if (data.type) {
        dispatch(
          authActions.login({
            id: data.id,
          })
        );
        router.replace("/");
      }
    }

    // sign in
    if (state === "sign-in") {
      const res = await fetch(
        "https://micro-blog-api.herokuapp.com/user/usersignin",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      // if user found
      // if success route to home
      // else error modal
      if (data.type) {
        //
        dispatch(
          authActions.login({
            id: data.id,
          })
        );
        router.replace("/");
      } else {
        alert(data.message);
      }
    }
  };

  const changeLink = () => {
    if (state === "sign-in") setState("sign-up");
    else setState("sign-in");
  };

  return (
    <Fragment>
      <form className={styles.blog_form} onSubmit={submitHandler}>
        {isLoading && <div className="loading-spinner"></div>}
        <div className={styles.form__head}>
          <h1>
            {state === "sign-in" ? "Welcome Back" : "Welcome Fellow Reader"}
          </h1>
          <b> {state === "sign-in" ? "Sign In" : "Sign Up"}</b>
          <p>
            {" "}
            {state === "sign-in"
              ? "We love seeing you back to read new,lovely blogs"
              : "Sign up and get ready to read awesome and informative blogs"}
          </p>
        </div>
        <div className={styles.form__body}>
          {state !== "sign-in" ? (
            <div className={styles.form__item}>
              <label htmlFor="email">Username</label>
              <input
                className="form__input"
                type="text"
                id="Username"
                ref={inputName}
                required
              />
            </div>
          ) : (
            ""
          )}
          <div className={styles.form__item}>
            <label htmlFor="email">Email</label>
            <input
              className="form__input"
              type="email"
              id="email"
              ref={inputEmail}
              required
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="password">Password</label>
            <input
              className="form__input"
              type="password"
              id="password"
              ref={inputPassword}
              required
            />
          </div>
          <div className={styles.form__action}>
            <button
              type="submit"
              onClick={submitHandler}
              className={styles.submit_btn}
            >
              {state === "sign-in" ? "Sign In" : "Sign Up"}
            </button>
          </div>
          {state === "sign-in" ? (
            <p>
              New here ?{" "}
              <a className={styles.form__link} onClick={changeLink}>
                Create a new account
              </a>{" "}
            </p>
          ) : (
            <p>
              Already a user here?{" "}
              <a className={styles.form__link} onClick={changeLink}>
                Sign in
              </a>{" "}
            </p>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default SignIN;
