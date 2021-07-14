// will contain nav and footer and other content as props children
import { Fragment } from "react";

import Nav from "../Navigation/nav";
import Footer from "../Footer/footer";

const Layout = (props) => {
  return (
    <div className="layout">
      <Nav />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
