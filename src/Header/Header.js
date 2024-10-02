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


  return (
    <nav className="navbar has-background-primary has-text-white is-align-items-center" role="navigation" aria-label="main navigation">
      <div className="navbar-brand is-flex is-justify-content-center	">
        <span className="navbar-item has-text-weight-bold is-uppercase has-text-white has-text-centered-touch	is-size-1 is-size-3-touch">Ma super ToDoList</span>

      </div>
      <div className="navbar-end">
        {token ? (
          <div className="navbar-item">
            <button onClick={handleLogout} className="button is-rounded is-outlined">Se déconnecter</button>
          </div>
        ) : (
          <div className="navbar-item">

            <Link to="/register" className="button is-rounded is-outlined">S'inscrire</Link>
            <Link to="/login" className="button is-rounded">Se connecter</Link>
          </div>

        )}

      </div>
    </nav>
  );
}
