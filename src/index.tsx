import * as React from 'react';
import * as RDC from 'react-dom/client';
import App from './pages/App/App';
import { BrowserRouter as Router} from 'react-router-dom';

const container = document.getElementById('root')
const root = RDC.createRoot(container!)

root.render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>,
);

