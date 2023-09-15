import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
