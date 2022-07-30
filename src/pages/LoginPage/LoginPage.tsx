import * as React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { LoginPageProps , LoginPageState} from '../../interfaces/pages/LoginPage'

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