import * as React from 'react';
import * as RDC from 'react-dom/client';
import App from './pages/App/App';
import './pages/App/App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
const container = document.getElementById('root')
const root = RDC.createRoot(container!)

const port = process.env.PORT

const client = new ApolloClient({
  uri: `http://localhost:3000`,
  //uri: `https://server-moodiefoodie.herokuapp.com/`,
  cache: new InMemoryCache()
});



root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router><App /></Router>
    </ApolloProvider>
  </React.StrictMode>,
);

//Fingers crossed!
