import { setUncaughtExceptionCaptureCallback } from "process";
import * as React from "react";
import { Link } from 'react-router-dom';
import { AppState } from '../../../pages/App/App'
import './Header.css'

interface HeaderProps {
  app: AppState
  setApp:React.Dispatch<React.SetStateAction<any>>
}

export default function Header({ app , setApp }: HeaderProps) {
  const [state , setState ] = React.useState(false)

  function logout(){
    localStorage.removeItem('token')
    setApp({...app , user:''})
  }
  return (<header className="bg-slate-900 text-white bold">
        {app.user ? (<>
          <h1 className="">Hi, {app.user}!</h1>
          <nav className="flex flex-row justify-around">
              <Link to="/" >Home</Link>
              <Link to="/favorites" >Favorites</Link>
              <Link to="/moods" >Edit Moods</Link>
          </nav>
          <button onClick={logout}>Log Out</button>
          </>
        ) : (
            <nav className="flex flex-row justify-around">
                <Link to="/" >Home</Link>
                <Link to="/login" >Login</Link>
                <Link to="/signup" >Signup</Link>
            </nav>
        )
        }
        </header> 
  )
}