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
import './App.css'
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

  React.useEffect(()=>{
    const token = localStorage.getItem('token')

    if(token){
      const payload = JSON.parse(window.atob(token.split('.')[1]))
      console.log(payload)

      if (payload.exp < Date.now() / 1000){
        console.log('Token expired.')
        localStorage.removeItem('token')

      }else if(payload.user.name !== app.user){
        setApp({...app , user: payload.user.name})

      }else{
        return
      }

    }else if(app.user){
      setApp({...app , user:''})

    }else{
      return
    }
  } , [app])

 
  return (
    <ApolloProvider client={client}>
      <Layout app={app} setApp={setApp}>

        {
          app.user ? (
            <Routes>
              <Route path="/welcome"
                element={<HomePage />} />
              <Route path="/profile"
                element={<ProfilePage />} />
              <Route path="/interests" />
              <Route path="/*"
                element={<Navigate to='/welcome' />} />
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
