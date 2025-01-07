import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import Loader from '../Loader/Loader'; // Ajustez le chemin si nécessaire



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialiser useNavigate
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état pour le chargement



  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Démarrer le loader
    try {
      const response = await axios.post('https://my-app-backend-nxuu.onrender.com/users/login', {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Stocke le token dans le localStorage
      localStorage.setItem('token', response.data.token);
      setMessage('Connexion réussie');
  
      // Rediriger vers la liste des tâches après connexion réussie
      navigate('/tasks');
    } catch (error) {
      setMessage('Erreur lors de la connexion');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false); // Arrêter le loader
    }
  };
  

  return (
    <section className="section is-flex is-justify-content-center is-align-items-center">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title has-text-centered">Connexion</h1>
            {isLoading ? (
              <Loader /> // Affiche le composant Loader
            ) : (
              <form onSubmit={handleLogin}>
                <div className="field">
                  <label className="label">Email :</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Mot de passe :</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                </div>
                <div className="control mt-5 is-flex is-justify-content-flex-end">
                  <button type="submit" className="button is-primary has-text-white is-fullwidth">
                    Se connecter
                  </button>
                </div>
                {message && <p className="help is-danger mt-2">{message}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
