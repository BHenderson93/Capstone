import { setUncaughtExceptionCaptureCallback } from "process";
import * as React from "react";
import { Link } from 'react-router-dom';
import { AppState } from '../../../pages/App/App'
import './Header.css'
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
  return (<>
        {app.user ? (
        <header className="bg-sky-600">
          <h1 className="">Hi, {app.user}!</h1>
          <nav className="flex flex-row justify-around">
              <Link to="/" >Home</Link>
              <Link to="/favorites" >Favorites</Link>
              <Link to="/moods" >Edit Moods</Link>
          </nav>
          <button onClick={logout}>Log Out</button>
        </header>
        ) : (
          <header className="bg-sky-600">
            <nav className="flex flex-row justify-around">
                <Link to="/" >Home</Link>
                <Link to="/login" >Login</Link>
                <Link to="/signup" >Signup</Link>
            </nav>
          </header>
        )
        }  
    </>
  )
}