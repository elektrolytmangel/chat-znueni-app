import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './custom.scss';
import './index.css';
import * as serviceWorker from './serviceWorker';

serviceWorker.register();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);