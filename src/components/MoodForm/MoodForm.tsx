import * as React from 'react'
import {gql, useMutation} from '@apollo/client'

export default function MoodForm({app, setApp, initialState}){
    const {name, categories, price, id} = initialState

    const [state, setState]=React.useState({
        name,
        categories,
        price,
        id
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
                console.log("new mood res is " , res)

                setState({
                    name:'',
                    categories:'',
                    price:0,
                    id: null
                })
                const {id, name, categories, price} = res.data.create
                let newMoods = [...app.moods]
                console.log('Newmoods pre addition is ' , newMoods)
                const addMood = {
                    id:id,
                    name:name,
                    categories:categories,
                    price:price
                }
                newMoods.push(addMood)
                console.log('Newmoods post addition is ' , newMoods)
                setApp({
                    ...app,
                    moods: newMoods
                })
                console.log('messed with app user.')
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    return(
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">What is this mood called? </label>
        <input type="text" name="name" placeholder="i.e. Mama Mia! Pasta, baby, pasta!" onChange={changeName} value={state.name}/>
        <label htmlFor="categories">What style of food fits this mood?</label>
        <input type="text" name="categories" id="" placeholder="i.e. Italian " onChange={changeCategories} value={state.categories}/>
        <label htmlFor="price">How ritzy? (1-5 in dollar signs)</label>
        <input type="number" name="price" id="" placeholder="Ex: 3" onChange={changePrice} value={state.price}/>
        <button type="submit" className="btn" >Submit!</button>
    </form>
    )

}