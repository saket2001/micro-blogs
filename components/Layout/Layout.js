// will contain nav and footer and other content as props children
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Navigation/nav";
import Footer from "../Footer/footer";
import SignIN from "../Auth Form/SignIn";

const Layout = (props) => {
  //true or false
  const authStatus = useSelector((state) => state.auth.authStatus);
  // sign-in or sign-up
  const authState = useSelector((state) => state.auth.authState);

  if (authStatus)
    return (
      <div className="auth-layout">
        <SignIN />
      </div>
    );

  return (
    <div className="layout">
      {!authStatus && <Nav />}
      {!authStatus && props.children}
      {!authStatus && <Footer />}
    </div>
  );
};

export default Layout;
