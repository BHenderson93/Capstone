import * as React from 'react'
import { useMutation, gql } from '@apollo/client'

interface Props{
    isLoading: boolean,
    name: string,
    categories: string,
    price: number
}

export default function MoodsPage(){
    const [state,setState]=React.useState<Props>({
        isLoading: false,
        name:'',
        categories:'',
        price:0
    })

    const NEW_MOOD = gql`
mutation Create($name: String!, $categories: String!, $price: Int!, $token: String!) {
  create(name: $name, categories: $categories, price: $price, token: $token) {
    id
    name
  }
}
`

    const [newMood , {data, loading, error}] = useMutation(NEW_MOOD , {
        variables:{
            name:state.name,
            categories:state.categories,
            price:state.price,
            token:localStorage.getItem('token')
        }
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

    async function handleSubmit(e){
        e.preventDefault()
        if( state.name && state.categories && state.price && localStorage.getItem('token')){
            console.log('Entering try block2 with ' , [state.name,state.categories,typeof state.price,localStorage.getItem('token')])

            newMood().then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    return(
    <main>
        <div className="container">
        <h1>Moods</h1>
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