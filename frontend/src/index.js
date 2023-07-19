import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { AllRouter } from './Router/AllRouter';
import Footer from "./footer/Footer";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AllRouter />
    <Footer/>
  </React.StrictMode>
);
reportWebVitals();
