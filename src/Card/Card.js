import React, { useState, useEffect } from 'react';

import './Card.css';
export default function Card({ titre, frequence, id, suppr, tache, update, patch }) {

  // Utiliser un état pour suivre si la carte a été cliquée
  const [isClicked, setIsClicked] = useState(false);


  // Vérification de l'état pour définir la couleur de la tâche
  useEffect(() => {
    if (tache.etat === true) {
      console.log("Complété");
      setIsClicked(true);
    } else {
      console.log("À faire");
      setIsClicked(false);
    }
  }, [tache.etat]);

  // Fonction pour basculer l'état quand on clique sur la carte
  const handleEtatChange = (id, currentEtat) => {
    setIsClicked(!isClicked);
    const newEtat = !currentEtat; // Inverse l'état
    patch(id, newEtat); // Appelle la fonction pour mettre à jour l'état
  };

   // Cette fonction gère le clic sur le bouton "Modifier"
   const handleEditClick = (event) => {
    event.stopPropagation();  // Empêche la propagation de l'événement à la carte
    console.log("Modifier la tâche:", titre);
    update(tache);
  };

     // Cette fonction gère le clic sur le bouton "Supprimer(X)"
     const handleDeleteClick = (event) => {
      event.stopPropagation();  // Empêche la propagation de l'événement à la carte
      console.log("Suppresion de la tâche:", titre);
      suppr(id);
    };

  return (
    // <div className="card has-background-primary  my-5" onClick={()=>console.log("coucou")}>
    <div
      className={`card ${isClicked ? 'has-background-warning' : 'has-background-primary'}`}
      onClick={() => handleEtatChange(tache._id, tache.etat)}>
      <div className="card-content columns">
        <div className="content column">
          <div className='bouton'>
            <h3 className="px-4">{titre}</h3>
            <button className="delete" onClick={handleDeleteClick}></button>
          </div>
          <p className="is-size-4 px-4">{frequence}</p>
          <div className="bouton update">
            {/* <button className="button is-white is-outlined" onClick={() => update(tache) && handleEtatChange(tache._id, tache.etat)}>Modifier</button> */}
            <button className="button is-white is-outlined" onClick={handleEditClick}>Modifier</button>

          </div>
        </div>
      </div>
    </div>
  )
}
