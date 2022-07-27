//React
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// Pages and components
import HomePage from '../HomePage/HomePage'
import ProfilePage from "../ProfilePage/ProfilePage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import Layout from "../../components/Layout/Layout";

export interface AppState {
  user: string
  mount: boolean
}
export default function App() {
  const [app, setApp] = React.useState<AppState>({
    user: '',
    mount: true
  })

  const client = new ApolloClient({
    uri: `http://localhost:3000`,
    cache: new InMemoryCache()
  });

/*    React.useEffect(()=>{
    const payload = checkAndGetTokenPayload()
    if (!payload || app.user !== payload){
        setApp({...app, user:''})

      }
    }, [app.user]) */
 
  return (
    <ApolloProvider client={client}>
      <Layout app={app}>

        {
          app.user ? (
            <Routes>
              <Route path="/"
                element={<HomePage />} />
              <Route path="/profile"
                element={<ProfilePage />} />
              <Route path="/interests" />
              <Route path="/*"
                element={<Navigate to='/' />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/"
                element={<HomePage />} />
              <Route path="/login"
                element={<LoginPage setApp={setApp}  app={app}/>} />
              <Route path="/signup"
                element={<SignupPage setApp={setApp} app={app}/>}
                 />
              <Route path="/*"
                element={<Navigate to='/' />} />
            </Routes>
          )
        }
      </Layout >
    </ApolloProvider>
  )
}
