import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navClass = ({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link");

const Navbar = ({ token, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link to="/" className="brand" onClick={closeMenu}>
          TaskForge
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        <div className={isOpen ? "nav-items nav-items-open" : "nav-items"}>
          <NavLink to="/" className={navClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/features" className={navClass} onClick={closeMenu}>
            Features
          </NavLink>
          <NavLink to="/about" className={navClass} onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass} onClick={closeMenu}>
            Contact
          </NavLink>
          {token ? (
            <>
              <NavLink to="/dashboard" className={navClass} onClick={closeMenu}>
                Dashboard
              </NavLink>
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass} onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary" onClick={closeMenu}>
                Get Started
              </NavLink>
            </>
          )}
          {token && user?.name ? <span className="user-pill">Hi, {user.name}</span> : null}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
