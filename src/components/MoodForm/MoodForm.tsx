import * as React from 'react'
import {gql, useMutation} from '@apollo/client'
import {InitialState} from '../../pages/MoodsPage/MoodsPage'

export default function MoodForm({handleNewMood, initialState, handleUpdateMood, refresh}){
    const {id, name, categories, price} = initialState

    const [state, setState]=React.useState<InitialState>({
        id:id,
        name:name,
        categories:categories,
        price:price
    })

    React.useEffect(()=>{
        setState({
            id:id,
            name:name,
            categories:categories,
            price:price,
        })
    }, [refresh])

    function changeName(e){
        if(e.target.value.length < 25){
            setState({...state, name:e.target.value})
        }
    }

    function changeCategories(e){
        if(e.target.value.length < 25){
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
                categories
                price
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
        if(state.id){
            updateMood().then((res)=>{
                console.log(res)
                handleUpdateMood(res.data.update)
            }).catch((err)=>{
                console.log(err)
            })
        }else{

            newMood().then((res)=>{
                const {id, name, categories, price} = res.data.create
                const addMood = {
                    id:id,
                    name:name,
                    categories:categories,
                    price:price
                }
                handleNewMood(addMood)
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