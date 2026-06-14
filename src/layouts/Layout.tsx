import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/aktuality';

  return (
    <div className="layout-container">
      <header className="main-header">
        <div className="container">
          <nav className="main-nav">
            <ul>
              <li><NavLink to="/aktuality">AKTUALITY</NavLink></li>
              <li><NavLink to="/vycvik">VÝCVIK</NavLink></li>
              <li><NavLink to="/provozni-rad">PROVOZNÍ ŘÁD</NavLink></li>
              <li><NavLink to="/clenove">ČLENOVÉ</NavLink></li>
              <li><NavLink to="/galerie">GALERIE</NavLink></li>
              <li><NavLink to="/uzitecne">UŽITEČNÉ</NavLink></li>
              <li><NavLink to="/kontakt">KONTAKT</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      {isHome && (
        <div className="hero-banner">
          <div className="container hero-container">
            <div className="hero-content">
              <h2>ZKO 349 – PODĚBRADY</h2>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>ZKO-349 PODĚBRADY &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
