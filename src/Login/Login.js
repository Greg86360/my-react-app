import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
