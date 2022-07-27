import * as React from 'react'
import { gql, useMutation } from '@apollo/client'
import { AppState } from '../../pages/App/App'



interface SignupFormProps{
    setApp: React.Dispatch<React.SetStateAction<any>>,
    app: AppState
}

interface SignupFormState{
    name:string,
    email:string,
    password:string,
    confirm:string
}

export default function SignupForm({setApp , app}: SignupFormProps) {

    const [state, setState] = React.useState<SignupFormState>({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })

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

    const [signup, { data, loading, error }] = useMutation(SIGNUP , {
        variables:{
            name: state.name,
            email: state.email,
            password: state.password
        }
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        if (state.password !== state.confirm) {
            console.log('Passwords do not match.')
            return null
        }else{
            const response = await signup()
            console.log("Got this data back after signup " , response.data)
            const token = response.data.signup.token
            const user = response.data.signup.user.name

            localStorage.setItem('token' , token)
            setApp({...app , user:user})
            return null
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.currentTarget.value })
    }

    return (
        <div className="container">
            <form action="" onSubmit={handleSubmit} id="form">
                <label htmlFor="name">Full Name: </label>
                <input type="text" name="name" key="name" onChange={handleChange} placeholder="Ex: Hay Yu" value={state.name} required />
                {(state.name.length < 3 && state.name.length !== 0) ? <p className="error">Name must be at least 3 characters.</p> : <br />}

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" key="email" onChange={handleChange} placeholder="Ex: Type.Email.Here@HayYu.person" value={state.email} required />
                {(state.email.length === 0 || (state.email.includes('@') && state.email.includes('.'))) ? <br /> : <p className="error">Please enter a valid email.</p>}

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" key="password" onChange={handleChange} placeholder="Password" value={state.password} required />
                {(state.password.length < 5 && state.password.length !== 0) ? <p className="error">Password must be at least 5 characters.</p> : <br />}

                <label htmlFor="confirm">Confirm password: </label>
                <input type="password" name="confirm" key="confirm" onChange={handleChange} placeholder="Password" value={state.confirm} required />
                {state.confirm !== state.password && state.confirm.length !== 0 ? <p className="error">Password confirmation must match.</p> : <br />}

                <button type="submit" className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'}>Submit!</button>
            </form>
        </div>
    )
}