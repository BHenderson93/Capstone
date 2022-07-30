//React
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
  useMutation
} from "@apollo/client";

// Pages and components
import './App.css'
import HomePage from '../HomePage/HomePage'
import SavedPage from "../SavedPage/SavedPage"
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import WelcomePage from "../WelcomePage/WelcomePage"
import MoodsPage from "../MoodsPage/MoodsPage";
import Layout from "../../components/Layout/Layout";

export interface AppState {
  user: string
  reload: boolean
  moods: Mood[]
}
export interface Mood {
  id?: number
  name?: string
  categories?: string
  price?: number
}

export default function App() {
  const [app, setApp] = React.useState<AppState>({
    user: '',
    reload: false,
    moods: []
  })

  const MOODQUERY = gql`
    query Usermoods( $token:String!){
        usermoods(token:$token){
          id
          name
          price
          categories
          }            
    }`
  const [moodquery, { data, loading, error }] = useLazyQuery(MOODQUERY, {
    variables: {
      token: localStorage.getItem('token')
    }
  })
  const nav = useNavigate()
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]))
        const moodList = async () => {
          //console.log('Updating mood list...')
          moodquery().then((res) => {
            console.log("res is" ,res)
            const userMoods = res.data.usermoods
            setApp({
              ...app,
              moods: userMoods,
              user:payload.user.name
            })
          })
        }
        moodList()
        console.log('should have just updated mood list')
      }
  }, [app.user])

  return (

    <Layout app={app} setApp={setApp}>
      {
        app.user ? (
          <Routes>
            <Route path="/welcome"
              element={<WelcomePage />} />
            <Route path="/favorites"
              element={<SavedPage />} />
            <Route path="/moods"
              element={<MoodsPage app={app} setApp={setApp} moods={app.moods}/>} />
            <Route path="/*"
              element={<Navigate to='/welcome' />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/"
              element={<HomePage />} />
            <Route path="/login"
              element={<LoginPage setApp={setApp} app={app} />} />
            <Route path="/signup"
              element={<SignupPage setApp={setApp} app={app} />}
            />
            <Route path="/*"
              element={<Navigate to='/' />} />
          </Routes>
        )
      }
    </Layout >
  )
}
