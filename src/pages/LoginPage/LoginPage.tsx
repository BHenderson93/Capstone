import * as React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import {AppState} from '../App/App'

export interface LoginPageProps{
    setApp: React.Dispatch<React.SetStateAction<any>>,
    app: AppState
}

export interface LoginPageState{
    
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState>{
    state: LoginPageState = {
        }

render(){
    return (
    <main>
        <h1>LoginPage</h1>
        <LoginForm setApp={this.props.setApp} app={this.props.app} />
    </main>

    )
}
}