import * as React from 'react';
import * as RDC from 'react-dom/client';
import App from './pages/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
const container = document.getElementById('root')
const root = RDC.createRoot(container!)

const client = new ApolloClient({
  uri: `http://localhost:3000`,
  cache: new InMemoryCache()
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router><App /></Router>
    </ApolloProvider>
  </React.StrictMode>,
);

