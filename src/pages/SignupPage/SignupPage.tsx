import * as React from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import { AppState } from '../App/App'

interface SignupProps {
    setApp: React.Dispatch<React.SetStateAction<any>>
    app: AppState
}

export default function SignupPage({ setApp, app }: SignupProps) {
    return (
        <main>
            <SignupForm setApp={setApp} app={app} />
        </main>
    )
}