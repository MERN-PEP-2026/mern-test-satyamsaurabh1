import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

const SiteLayout = ({ children }) => {
  const { token, user, logout } = useContext(AuthContext);

  return (
    <div className="site-shell">
      <Navbar token={token} user={user} onLogout={logout} />
      <main className="app-body">{children}</main>
      <footer className="site-footer">
        <div className="view-box footer-inner">
          <p>FlexTask Unified Platform</p>
          <p>Built with MERN</p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
