import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  const pages = ["orders"];

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="nav nav-underline justify-content-end">
          <li className="nav-item" key="home">
            <Link to="/" style={{ color: "#B48EAE" }} className={`color-lilac nav-link ${currentPage === '/' && 'active'}`}>
              Home
            </Link>
          </li>
          {pages.map((Page) => (
            <li className="nav-item" key={Page}>
              <Link to={`/${Page}`} style={{ color: "#B48EAE" }} className={`nav-link ${currentPage === `/${Page}` && 'active'}`}>
                {Page}
              </Link>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul className="nav nav-underline justify-content-end">
          <li className="nav-item">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <nav className="navbar bg-dark pb-3 border-bottom border-4 border-sky-blue" data-bs-theme="dark">
        <div className="container-fluid">
          <h1 className="px-4 text-fawn" href="/">Avalanche Tech</h1>

          {showNavigation()}
        </div>
      </nav>
    </header>
  );
}

export default Nav;