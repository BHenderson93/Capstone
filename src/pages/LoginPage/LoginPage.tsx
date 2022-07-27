import * as React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { AppState } from '../App/App'


interface LoginProps{
    setApp: React.Dispatch<React.SetStateAction<any>>,
    app: AppState
}

export default function LoginPage({setApp , app}: LoginProps) {

    return (
    <main>
        <h1>LoginPage</h1>
        <LoginForm setApp={setApp} app={app} />
    </main>

    )
}
