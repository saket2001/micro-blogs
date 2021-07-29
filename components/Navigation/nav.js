import styles from "./nav.module.css";
import Link from "next/link";
import Image from "next/image";
import menuImg from "../../public/icons8-menu.svg";
import closeImg from "../../public/menu-close.png";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const menuHandler = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <Fragment>
      <div className={styles.nav}>
        <div className={styles.nav__logo}>
          <i className="fas fa-blog "></i>
          <p>MicroBlogs</p>
        </div>
        <div className={styles.nav__items}>
          <Link href="/">
            <a className={styles.nav__item}>Home</a>
          </Link>
          <Link href="/">
            <a className={styles.nav__item}>Your Blogs</a>
          </Link>
          <Link href="/savedblog">
            <a className={styles.nav__item}>Saved Blogs</a>
          </Link>
          <Link href="/addblog" className={styles.nav__item}>
            <a className={styles.nav__item}>Add Blog</a>
          </Link>
          <Link href="/signin" className={styles.nav__item}>
            <a className={styles.nav__item} onClick={logoutHandler}>
              Logout
            </a>
          </Link>
        </div>
        <div
          className={(styles.nav__item, styles.nav__menu__logo)}
          onClick={menuHandler}
        >
          <Image src={menuImg} alt="" width="40px" height="30px" />
        </div>
      </div>
      {showMenu && (
        <div className={styles.menu__nav}>
          <div className={styles.menu__close} onClick={menuHandler}>
            <Image src={closeImg} alt="" width="45px" height="40px" />
          </div>
          <Link href="/">
            <a className={styles.nav__item} onClick={menuHandler}>
              Home
            </a>
          </Link>
          <Link href="/addblog">
            <a className={styles.nav__item} onClick={menuHandler}>
              Add Blog
            </a>
          </Link>
          <Link href="/savedblog">
            <a className={styles.nav__item} onClick={menuHandler}>
              Saved Blogs
            </a>
          </Link>
          <Link href="/">
            <a className={styles.nav__item} onClick={menuHandler}>
              Your Blogs
            </a>
          </Link>
          <Link href="/signin">
            <a className={styles.nav__item} onClick={logoutHandler}>
              Logout
            </a>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default Nav;
