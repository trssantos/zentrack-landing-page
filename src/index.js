import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// For React 19, use createRoot approach
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);