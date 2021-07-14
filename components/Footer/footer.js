import styles from "./footer.module.css";

const footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__logo}>
        <i className="fas fa-blog fa-3x"></i>
        <p>MicroBlog</p>
      </div>
      <div className={styles.footer__content}>
        <p>We Like Reading New blogs From you.</p>
        <p>
          <i className="far fa-envelope fa-lg"></i>
          <span className={styles.footer__highlighted}>
            {" "}
            microblog@gmail.com
          </span>
        </p>
        <p>
          <i className="fas fa-phone-square-alt fa-lg"></i>
          <span className={styles.footer__highlighted}>+91 910231021</span>
        </p>
      </div>
      <div className={styles.footer__icons}>
        Follow Us
        <i className="fab fa-facebook-square fa-lg"></i>
        <i className="fab fa-instagram fa-lg"></i>
      </div>
    </div>
  );
};

export default footer;
