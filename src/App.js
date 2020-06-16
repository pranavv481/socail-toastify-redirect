import React from 'react';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  )
}

export default App;
