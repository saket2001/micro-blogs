import styles from "./nav.module.css";
import Link from "next/link";

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__logo}>
        <i className="fas fa-blog fa-3x"></i>
        <p>MicroBlog</p>
      </div>
      <div className={styles.nav__items}>
        <Link href="/">
          <a className={styles.nav__item}>Home</a>
        </Link>
        <Link href="/addblog" className={styles.nav__item}>
          <a className={styles.nav__item}>Add Blog</a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
