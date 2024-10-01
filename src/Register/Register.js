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
    <section class="section is-flex is-justify-content-center is-align-items-center">
      <div className="container">
        <div class="columns is-centered">
          <div class="column is-half">

            <form onSubmit={handleRegister}>
              <h1 className="title has-text-centered">Inscription</h1>
              <div className="field">
                <label className="label">Nom :</label>
                <div class="control has-icons-left has-icons-right">

                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-user"></i>                </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Email :</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    type="email"
                    className="input"
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
              <div className="field">
                <label className="label">Mot de passe :</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    type="password"
                    className="input"
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
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-primary has-text-white is-fullwidth">S'inscrire</button>
                </div>
              </div>
              {message && <p className="has-text-danger">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
