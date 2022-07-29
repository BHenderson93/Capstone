import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import { AppState } from '../App/App'
import MoodList from '../../components/MoodList/MoodList'
import './MoodsPage.css'

export interface MoodsPageState{
    isLoading: boolean
    name: string
    categories: string
    price: number
    id: number | null
}

export interface MoodsPageProps{
    app: AppState,
    setApp: React.Dispatch<React.SetStateAction<any>>
}

export default function MoodsPage({ app , setApp}:MoodsPageProps){
    
    const [state,setState]=React.useState<MoodsPageState>({
        isLoading: false,
        name:'',
        categories:'',
        price:0,
        id: null
    })



    function changeName(e){
        if(e.target.value.length < 50){
            setState({...state, name:e.target.value})
        }
    }

    function changeCategories(e){
        if(e.target.value.length < 50){
            setState({...state, categories:e.target.value})
        }
    }

    function changePrice(e){
        if(e.target.value < 6 && e.target.value > 0){
            setState({...state , price:Number(e.target.value)})
         }
    }
    const NEW_MOOD = gql`
    mutation Create($name: String!, $categories: String!, $price: Int!, $token: String!) {
      create(name: $name, categories: $categories, price: $price, token: $token) {
        id
        name
        categories
        price
        createdBy{
            name
        }
      }
    }
    `
    const [newMood , {data:newMoodData}] = useMutation(NEW_MOOD , {
        variables:{
            name:state.name,
            categories:state.categories,
            price:state.price,
            token:localStorage.getItem('token')
        }
    })

    const UPDATE_MOOD = gql`
        mutation Update($categories: String!, $id: Int!, $name: String!, $price: Int!, $token: String!){
            update(categories:$categories , id:$id , name:$name , price:$price , token:$token){
                id
                name
            }            
        }
    `

    const [updateMood , {data:updateMoodData}] = useMutation(UPDATE_MOOD , {
        variables:{
            categories:state.categories,
            id: state.id,
            name: state.name,
            price: state.price,
            token:localStorage.getItem('token')
        }
    })

    async function handleSubmit(e){
        e.preventDefault()
        if(state.id && state.name && state.categories && state.price && localStorage.getItem('token')){
            updateMood().then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }
        if( state.name && state.categories && state.price && localStorage.getItem('token')){

            newMood().then((res)=>{
                console.log(res)
                setState({
                    isLoading: false,
                    name:'',
                    categories:'',
                    price:0,
                    id: null
                })
                setApp({
                    ...app,
                    user:''
                })
            }).catch((err)=>{
                console.log(err)
            })


        }
    }
    //console.log("Moods page moods " , app.moods)
    return(
    <main>
        <h1>Moods</h1>
        <div className="container">
        <MoodList moods={app.moods} moodsPage={state} setMoodsPage={setState}/>
        {/* Below should be modularized to a mood card. */}
        { state.isLoading? 
            <h1>Loading...</h1>
            :
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="name">What is this mood called? </label>
                <input type="text" name="name" placeholder="i.e. Mama Mia! Pasta, baby, pasta!" onChange={changeName} value={state.name}/>
                <label htmlFor="categories">What style of food fits this mood?</label>
                <input type="text" name="categories" id="" placeholder="i.e. Italian " onChange={changeCategories} value={state.categories}/>
                <label htmlFor="price">How ritzy? (1-5 in dollar signs)</label>
                <input type="number" name="price" id="" placeholder="Ex: 3" onChange={changePrice} value={state.price}/>
                <button type="submit" className="btn" >Submit!</button>
            </form>
        }
        </div>
    </main>
    )
}