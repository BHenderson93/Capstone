import * as React from 'react'
import { AppState } from '../../pages/App/App'
import { gql , useMutation } from '@apollo/client'

interface LoginProps {
    app: AppState,
    setApp: React.Dispatch<React.SetStateAction<any>>
}

export default function LoginForm({ app, setApp }: LoginProps) {
    const [state, setState] = React.useState({
        email: '',
        password: '',
    })

    const LOGIN = gql`
        mutation login( $email:String!, $password:String!){
            login(email:$email , password:$password){
                token,
                user{
                    email,
                    name,
                }
            }            
        }
    `

    const [login, { data, loading, error }] = useMutation(LOGIN , {
        variables:{
            email: state.email,
            password: state.password
        }
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await login()
        console.log("Got this data back after signup ", response.data)
        const token = response.data.login.token
        const user = response.data.login.user.name
        localStorage.setItem('token', token)
        setApp({ ...app, user: user })
        return null

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.currentTarget.value })
    }


    return (
        <div className="container">
            <form action="" onSubmit={handleSubmit} id="form">

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" key="email" onChange={handleChange} placeholder="Ex: Type.Email.Here@HayYu.person" value={state.email} required />
                {(state.email.length === 0 || (state.email.includes('@') && state.email.includes('.'))) ? <br /> : <p className="error">Please enter a valid email.</p>}

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" key="password" onChange={handleChange} placeholder="Password" value={state.password} required />
                <br />

                <button type="submit" className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'}>Submit!</button>
            </form>
        </div>
    )
}