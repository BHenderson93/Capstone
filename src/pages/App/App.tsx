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
import LoginForm from '../../components/LoginForm/LoginForm'
import SignupForm from '../../components/SignupForm/SignupForm'
import WelcomePage from "../WelcomePage/WelcomePage"
import MoodsPage from "../MoodsPage/MoodsPage";
import Layout from "../../components/Layout/Layout";

//Other
export interface AppState {
  user: string
  reload: boolean
  moods: Mood[]
}

export interface Mood {
  id: number
  name: string
  categories: string
  price: number
}


const MOODQUERY = gql`
query Usermoods( $token:String!){
    usermoods(token:$token){
      id
      name
      price
      categories
      createdBy{
        name
        id
        email
      }
      }            
}`


export default function App() {
  const [app, setApp] = React.useState<AppState>({
    user: '',
    reload: false,
    moods: []
  })

  const [moodquery, { data, loading, error }] = useLazyQuery(MOODQUERY, {
    variables: {
      token: localStorage.getItem('token')
    }
  })

  const nav = useNavigate()
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    const moodList = async () => {
      //console.log('Updating mood list...')
      //@ts-ignore
      const payload = JSON.parse(window.atob(token.split('.')[1]))
      moodquery().then((res) => {
        console.log("res is", res)
        const userMoods = res.data.usermoods
        console.log('usermoods are ', userMoods)
        console.log('payload.user.name is ' , payload.user.name)
        setApp({
          ...app,
          moods: userMoods,
          user:payload.user.name
        })
      }).catch((err) => {
        console.log('Error fetching moods', err)
      })
    }

    if (token) {
      moodList()
      }
  }
    , [])

  return (

    <Layout app={app} setApp={setApp}>
      {
        app.user ? (
          <Routes>
            <Route path="/welcome"
              element={<WelcomePage moods={app.moods} />} />
            <Route path="/favorites"
              element={<SavedPage />} />
            <Route path="/moods"
              element={<MoodsPage app={app} setApp={setApp} moods={app.moods} />} />
            <Route path="/*"
              element={<Navigate to='/welcome' />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/"
              element={<HomePage />} />
            <Route path="/login"
              element={<LoginForm setApp={setApp} app={app} />} />
            <Route path="/signup"
              element={<SignupForm setApp={setApp} app={app} />}
            />
            <Route path="/*"
              element={<Navigate to='/' />} />
          </Routes>
        )
      }
    </Layout >
  )
}
