import * as React from 'react'
import { AppState } from '../../pages/App/App'
import { gql, useMutation } from '@apollo/client'

interface LoginProps {
    app: AppState,
    setApp: React.Dispatch<React.SetStateAction<any>>
}

const LOGIN = gql`
mutation login( $email:String!, $password:String!){
    login(email:$email , password:$password){
        token,
        user{
            email,
            name,
        }
    }            
}`

export default function LoginForm({ app, setApp }: LoginProps) {
    const [state, setState] = React.useState({
        email: '',
        password: '',
        valid: true
    })

    React.useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const [login, { data, loading, error }] = useMutation(LOGIN, {
        variables: {
            email: state.email,
            password: state.password
        },
        context: {
            headers: {
                "Content-Type": "application/json"
            }
        }
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response = await login()
            console.log("Got this data back after login", response.data)
            const token = response.data.login.token
            const user = response.data.login.user.name
            localStorage.setItem('token', token)
            setApp({ ...app, user: user })
        } catch (error) {
            console.log(error)
            setState({ ...state, valid: false })
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.currentTarget.value })
    }

    return (
        <div>

            <h1 className="min-w-full text-center text-3xl">Login to continue...</h1>
            <br />
            <form action="" onSubmit={handleSubmit} id="form" className="container-medium borderzz">

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" key="email" onChange={handleChange} placeholder="Ex: Type.Email.Here@HayYu.person" value={state.email} required />
                {(state.email.length === 0 || (state.email.includes('@') && state.email.includes('.'))) ? <br /> : <p className="error">Please enter a valid email.</p>}

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" key="password" onChange={handleChange} placeholder="Password" value={state.password} required />
                {state.valid ? <br /> : <p className="error">Incorrect password! Try again...</p>}

                <button type="submit" className="btn flex items-center justify-center py-5 w-full bg-slate-900 text-white font-medium uppercase rounded hover:bg-green-700 transition duration-150 ease-in-out">Login!</button>
            </form>
        </div>
    )
}