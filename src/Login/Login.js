import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialiser useNavigate


  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      // Vérifiez les valeurs des variables email et password

      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      },
        {
          headers: {
            'Content-Type': 'application/json', // Assurez-vous que les en-têtes sont définis correctement
          }
        });

      // Stocke le token dans le localStorage
      localStorage.setItem('token', response.data.token);
      setMessage('Connexion réussie');
      console.log(localStorage.getItem('token'));

      console.log(response.data);

      // Rediriger vers la liste des tâches après connexion réussie
      navigate('/tasks'); // Rediriger vers la page des tâches

    } catch (error) {
      // Ajout de logs détaillés de l'erreur
      if (error.response) {
        // Le serveur a répondu avec un code d'erreur (4xx ou 5xx)
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        console.error('Error Response Headers:', error.response.headers);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.error('Error Request:', error.request);
      } else {
        // Quelque chose s'est mal passé lors de la configuration de la requête
        console.error('Error Message:', error.message);
      }
      setMessage('Erreur lors de la connexion');
      console.error('Error logging in:', error);
    }
  };

  return (
    <section class="section is-flex is-justify-content-center is-align-items-center">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title has-text-centered">Connexion</h1>
            <form onSubmit={handleLogin}>
              <div class="field">
                <label class="label">Email :</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    type="email" class="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Mot de passe :</label>
                <div class="control has-icons-left has-icons-right">

                <input
                  type="password" class="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
              </div>
              <div class="control mt-5 is-flex is-justify-content-flex-end">

                <button type="submit" class="button is-primary has-text-white is-fullwidth">Se connecter</button>
                {message && <p>{message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
