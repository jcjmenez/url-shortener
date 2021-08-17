import { NavLink } from 'react-router-dom';
import './styles.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-container">
      <NavLink exact to="/" className="nav-logo">
        Url-Shortener
      </NavLink>
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="active" className="nav-links">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/top" activeClassName="active" className="nav-links">
            Top Urls
          </NavLink>
        </li>
      </ul>

    </div>

  </nav>
);

export default Navbar;
