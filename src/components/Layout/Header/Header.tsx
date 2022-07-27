import * as React from "react";
import { Link } from 'react-router-dom';
import { AppState } from '../../../pages/App/App'

interface HeaderInt {
  app: AppState
}

export default function Header({ app }: HeaderInt) {
  return (

    <header className="bg-sky-600">
      <nav className="flex flex-row justify-around">
        {app.user ? (
          <>
            <h1>{app.user}</h1>
            <Link to="/" >Home</Link>
            <Link to="/profile" >Profile</Link>
            <Link to="/interests" >Interests</Link>
          </>
        ) : (
          <>
            <Link to="/" >Home</Link>
            <Link to="/login" >Login</Link>
            <Link to="/signup" >Signup</Link>
          </>
        )
        }
      </nav>
    </header>
  )
}