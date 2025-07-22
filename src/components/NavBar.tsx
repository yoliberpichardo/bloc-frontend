import { Link, NavLink } from 'react-router-dom';
import '../styles/NavBarStyles.css';
import { useAuth } from '../contexts/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              MyApp
            </Link>
          </div>

          <div className="navbar-desktop-menu">
            <div className="navbar-links">
              <NavLink to="/" className="navbar-link">
                Home
              </NavLink>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="navbar-link navbar-button"
                >
                  Cerrar sesión
                </button>
              ) : (
                <>
                  <NavLink to="/login" className="navbar-link">
                    Iniciar sesión
                  </NavLink>
                  <NavLink to="/register" className="navbar-link">
                    Registrarse
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;