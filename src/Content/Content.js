import { useEffect, useState } from "react";
import Card from '../Card/Card';
import './Content.css';

export default function Content() {
  const [taches, setTaches] = useState([]);
  const [titre, setTitre] = useState('');
  const [frequence, setFrequence] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  // Récupérer le token JWT depuis localStorage
  const token = localStorage.getItem('token');

  /******* Récupération des tâches de la bdd (Mongodb) ***************/
  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const res = await fetch('http://localhost:5000/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`, // Envoi du token dans l'en-tête
          },
        });
        const data = await res.json();
        setTaches(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };
    fetchTaches();
  }, [token]);

  /**** Suppression d'une tâche *********/
  const deleteCard = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Envoi du token dans l'en-tête
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la tâche');
      }

      setTaches(prevTaches => prevTaches.filter(tache => tache._id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  /******** Ajout et Mise à jour d'une tâche ********/
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (selectedTask) {
      // Mise à jour d'une tâche
      const updatedTask = { titre, frequence };

      try {
        const response = await fetch(`http://localhost:5000/tasks/${selectedTask._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`, // Envoi du token dans l'en-tête
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de la tâche');
        }

        const data = await response.json();
        setTaches(taches.map(tache => (tache._id === selectedTask._id ? data : tache)));
        setSelectedTask(null);
        setTitre('');
        setFrequence('');
      } catch (error) {
        console.error('Erreur:', error);
      }
    } else {
      // Ajout d'une nouvelle tâche
      const newTask = { titre, frequence };

      try {
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Envoi du token dans l'en-tête
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout de la tâche');
        }

        const result = await response.json();
        setTaches(prevTaches => [...prevTaches, result]);
        setTitre('');
        setFrequence('');
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  /*** Mise à jour de l'état de la tâche (PATCH) */
  const patchTask = async (id, updatedEtat) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`, // Envoi du token dans l'en-tête
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ etat: updatedEtat }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la tâche');
      }

      const data = await response.json();
      setTaches((prevTaches) =>
        prevTaches.map((tache) => (tache._id === id ? { ...tache, etat: updatedEtat } : tache))
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  /*** Gestion de la sélection de la tâche */
  const handleSelectTask = (tache) => {
    setSelectedTask(tache);
    setTitre(tache.titre);
    setFrequence(tache.frequence);
  };

  return (
    <div className="container px-3 my-5">
      <h2 className="is-size-4 py-5">Écrivez vos tâches</h2>
      <form onSubmit={handleUpdateTask}>
        <div className="field">
          <div className="control">
            <label htmlFor="tache" className="label">Titre</label>
            <input type="text" id="tache" className="input" value={titre} onChange={e => setTitre(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="frequence" className="label">Fréquence</label>
            <textarea id="frequence" className="input" value={frequence} onChange={e => setFrequence(e.target.value)} />
          </div>
        </div>

        <div className="control">
          <button className="button is-link has-background-primary is-fullwidth">Créer</button>
        </div>
      </form>

      {taches.length > 0 ? (
        taches.map((tache, index) => (
          <Card
            key={index}
            update={handleSelectTask}
            id={tache._id}
            titre={tache.titre}
            frequence={tache.frequence}
            suppr={deleteCard}
            tache={tache}
            patch={patchTask}
          />
        ))
      ) : (
        <p>Aucune tâche trouvée.</p>
      )}
    </div>
  );
}
