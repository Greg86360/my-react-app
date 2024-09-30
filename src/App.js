// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importer Route et Routes
import Header from './Header/Header';
import Content from './Content/Content';
import Login from './Login/Login'; // Importer le composant Login
import Register from './Register/Register'; // Assurez-vous d'importer le composant d'inscription

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/tasks" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
