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
  return (
  <header className="bg-slate-900 text-white text-xl flex flex-row nowrap justify-around">
        {app.user ? (<>
          <h1 className="w-2/12">Hi, {app.user}!</h1>
          <nav className="flex flex-row justify-around">
              {app.moods.length === 0 ? null : <Link to="/" className="w-3/12 flex items-center justify-center py-5 bg-blue-400 text-white font-medium uppercase rounded hover:bg-slate-600  transition duration-150 ease-in-out">Find Food!</Link>}
{/*               <Link className="w-3/12 flex items-center justify-center py-5 bg-blue-400 text-white font-medium uppercase rounded hover:bg-slate-600  transition duration-150 ease-in-out" to="/favorites"  >Favorites</Link> */}
              <Link className="w-3/12 flex items-center justify-center py-5 bg-blue-400 text-white font-medium uppercase rounded hover:bg-slate-600  transition duration-150 ease-in-out" to="/moods" >Edit Moods</Link>
          </nav>
          <button className="flex items-center justify-center py-5 w-2/12 bg-red-600 text-white font-medium uppercase rounded hover:bg-red-900 transition duration-150 ease-in-out" onClick={logout}>Log Out</button>
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