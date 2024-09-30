// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importer BrowserRouter
import '../node_modules/bulma/css/bulma.min.css';
import App from './App'; // Importer votre composant App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App /> {/* Utiliser App comme point d'entrée */}
    </Router>
  </React.StrictMode>
);
