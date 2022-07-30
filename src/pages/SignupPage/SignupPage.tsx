import * as React from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import { AppState } from '../App/App'

export interface SignupPageProps {
    setApp: React.Dispatch<React.SetStateAction<any>>
    app: AppState
}

export interface SignupPageState{

}

export default function SignupPage({ setApp, app }: SignupPageProps) {
    return (
        <main>
            <SignupForm setApp={setApp} app={app} />
        </main>
    )
}