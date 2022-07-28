import { setUncaughtExceptionCaptureCallback } from "process";
import * as React from "react";
import { Link } from 'react-router-dom';
import { AppState } from '../../../pages/App/App'

interface HeaderInt {
  app: AppState
  setApp:React.Dispatch<React.SetStateAction<any>>
}

export default function Header({ app , setApp }: HeaderInt) {
  const [state , setState ] = React.useState(false)
  function logout(){
    localStorage.removeItem('token')
    setApp({...app , user:''})
  }
  return (

    <header className="bg-sky-600">
      <nav className="flex flex-row justify-around">
        {app.user ? (
          <ul>
            <h1>{app.user}</h1>
            <Link to="/" >Home</Link>
            <Link to="/profile" >Profile</Link>
            <Link to="/moods" >Food Moods</Link>
            <button onClick={logout}>Log Out</button>
          </ul>
        ) : (
          <ul>
            <Link to="/" >Home</Link>
            <Link to="/login" >Login</Link>
            <Link to="/signup" >Signup</Link>
          </ul>
        )
        }
      </nav>

    </header>
  )
}