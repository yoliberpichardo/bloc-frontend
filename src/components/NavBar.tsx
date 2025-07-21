import { Link, NavLink } from 'react-router-dom';
import '../styles/NavBarStyles.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              MyApp
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="navbar-desktop-menu">
            <div className="navbar-links">
              <NavLink 
                to="/" 
                className="navbar-link"
              >
                Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;