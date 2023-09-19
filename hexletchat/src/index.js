import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AppRoot from './AppRoot';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(<AppRoot />);
};

app();
