import React from 'react';
import './Loader.css'; // Vous pouvez styliser votre loader ici

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Chargement en cours...</p>
    </div>
  );
};

export default Loader;
