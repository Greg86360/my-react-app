import React, { useState } from 'react'; // Importer useState
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isActive, setIsActive] = useState(false); // État pour gérer l'ouverture du menu

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsActive(!isActive); // Inverser l'état du menu
  };

  return (
    <nav className="navbar has-background-primary has-text-white is-align-items-center p-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <span className="navbar-item has-text-weight-bold is-uppercase has-text-white has-text-centered-touch	is-size-1 is-size-2-touch			">Ma super ToDoList</span>
        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-end">
          {token ? (
            <button onClick={handleLogout} className="button is-rounded is-outlined">Se déconnecter</button>
          ) : (
            <div className={`navbar-item ${isActive ? 'is-active' : ''}`}>

              <Link to="/register" className="button is-rounded is-outlined">S'inscrire</Link>
              <Link to="/login" className="button is-rounded">Se connecter</Link>
            </div>

          )}

        </div>
      </div>
    </nav>
  );
}
