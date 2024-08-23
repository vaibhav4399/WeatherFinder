import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';


import Header from './components/Header/Header'

import './App.css'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Weather from './components/Weather/Weather';
import Notfound from './components/Notfound/Notfound';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="result" element={<Weather />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App;