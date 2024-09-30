import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        name,
        email,
        password,
      });
      setMessage('Utilisateur enregistré avec succès');
      console.log(response.data);
    } catch (error) {
      setMessage('Erreur lors de l’inscription');
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <button type="submit">S'inscrire</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
