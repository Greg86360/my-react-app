import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate(); // Remplacer useHistory par useNavigate
  const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <nav className="navbar has-background-primary has-text-white is-flex is-justify-content-space-between is-align-items-center p-3">
      <div className="navbar-brand">
        <span className="navbar-item has-text-weight-bold is-uppercase">Ma super ToDoList</span>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <Link to="/tasks" className="navbar-item has-text-white">Tâches</Link>
          {token ? (
            <button onClick={handleLogout} className="navbar-item button is-danger">Se déconnecter</button>
          ) : (
            <>
              <Link to="/login" className="navbar-item has-text-white">Se connecter</Link>
              <Link to="/register" className="navbar-item has-text-white">S'inscrire</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
