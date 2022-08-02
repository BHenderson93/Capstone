import * as React from 'react'
import { gql, useMutation } from '@apollo/client'
import { AppState } from '../../pages/App/App'



interface SignupFormProps {
    setApp: React.Dispatch<React.SetStateAction<any>>,
    app: AppState
}

interface SignupFormState {
    name: string,
    email: string,
    password: string,
    confirm: string
}

export default function SignupForm({ setApp, app }: SignupFormProps) {

    const [state, setState] = React.useState<SignupFormState>({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })

    React.useEffect(()=>{
        localStorage.removeItem('token')
    },[])

    const SIGNUP = gql`
        mutation signup($name:String! , $email:String!, $password:String!){
            signup(name:$name , email:$email , password:$password){
                token,
                user{
                    email,
                    name,
                }
            }            
        }
    `

    const [signup, { data, loading, error }] = useMutation(SIGNUP, {
        variables: {
            name: state.name,
            email: state.email,
            password: state.password
        },
        context: {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        if (state.password !== state.confirm) {
            console.log('Passwords do not match.')
        } else {
            const response = await signup()
            console.log("Got this data back after signup ", response.data)
            const token = response.data.signup.token
            const user = response.data.signup.user.name
            if(user){
                localStorage.setItem('token', token)
                setApp({ ...app, user: user })
            }
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.currentTarget.value })
    }

    return (
            <form action="" onSubmit={handleSubmit} id="form" className="container-medium borderzz">
                <h1 className="text-3xl italic bold whitespace-nowrap text-center min-w-min p-5">Signup and Find Awesome Local Restaurants!</h1>
                <label htmlFor="name">Full Name: </label>
                <input type="text" name="name" key="name" onChange={handleChange} placeholder="Ex: Hay Yu" value={state.name} required />
                {(state.name.length < 3 && state.name.length !== 0) ? <p className="error">Name must be at least 3 characters.</p> : <br />}

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" key="email" onChange={handleChange} placeholder="HayYu.person@TypeEmail.Here" value={state.email} required />
                {(state.email.length === 0 || (state.email.includes('@') && state.email.includes('.'))) ? <br /> : <p className="error">Please enter a valid email.</p>}

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" key="password" onChange={handleChange} placeholder="Password" value={state.password} required />
                {(state.password.length < 5 && state.password.length !== 0) ? <p className="error">Password must be at least 5 characters.</p> : <br />}

                <label htmlFor="confirm">Confirm password: </label>
                <input type="password" name="confirm" key="confirm" onChange={handleChange} placeholder="Confirm" value={state.confirm} required />
                {state.confirm !== state.password && state.confirm.length !== 0 ? <p className="error">Password confirmation must match.</p> : <br />}

                <button type="submit" className="btn flex items-center justify-center py-5 w-full bg-slate-900 text-white font-medium uppercase rounded hover:bg-green-700 transition duration-150 ease-in-out">Sign Up!</button>
            </form>
    )
}