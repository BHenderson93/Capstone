import * as React from 'react'
import { gql, useMutation } from '@apollo/client'
import { InitialState } from '../../pages/MoodsPage/MoodsPage'
import { FilterScroll } from '../FilterScoll/FilterScroll'
import { YelpCat } from '../../components/YelpCat/YelpCat'


const NEW_MOOD = gql`
mutation CreateMood($name: String!, $categories: String!, $price: Int!, $token: String!) {
  createMood(name: $name, categories: $categories, price: $price, token: $token) {
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

const UPDATE_MOOD = gql`
mutation Updatemood($categories: String!, $id: Int!, $name: String!, $price: Int!, $token: String!){
    updateMood(categories:$categories , id:$id , name:$name , price:$price , token:$token){
        id
        name
        categories
        price
    }            
}
`

export interface MoodFormProps {
    handleNewMood: ({ }) => void
    initialState: InitialState
    handleUpdateMood: ({ }) => void
    refresh: boolean
}

export interface MoodFormState {
    id: number | null
    name: string
    categories: string[]
    price: number | string
}

export default function MoodForm({ handleNewMood, initialState, handleUpdateMood, refresh }: MoodFormProps) {
    const { id, name, categories, price } = initialState

    const [state, setState] = React.useState<MoodFormState>({
        id: id,
        name: name,
        categories: categories,
        price: price
    })

    React.useEffect(() => {
        setState({
            id: id,
            name: name,
            categories: categories,
            price: price,
        })
    }, [refresh])

    function changeName(e) {
        if (e.target.value.length < 50 && e.target.value.includes('*')===false) {
            setState({ ...state, name: e.target.value })
        }
    }

    function changePrice(e) {
        if(e.target.value.length === 0){
            //console.log('in top')
            setState({
                ...state, price: ''
            })
        }else if (e.target.value < 1){
            setState({ ...state, price: 1  })
        }else if (e.target.value > 4){
            setState({ ...state, price: 4 })
        }else if (Number(e.target.value) < 5 && Number(e.target.value) > 0){
            //console.log('in bot')
            setState({ ...state, price: e.target.value })
        } 
    }

    const [newMood, { data: newMoodData }] = useMutation(NEW_MOOD, {
        variables: {
            name: state.name,
            categories: state.categories.join('*'),
            price: Number(state.price),
            token: localStorage.getItem('token')
        },
        context: {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    })

    const [updateMood, { data: updateMoodData }] = useMutation(UPDATE_MOOD, {
        variables: {
            categories: state.categories.join('*'),
            id: state.id,
            name: state.name,
            price: Number(state.price),
            token: localStorage.getItem('token')
        },
        context: {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (state.id) {
            updateMood().then((res) => {
                console.log(res)
                handleUpdateMood(res.data.updateMood)
                setState({
                    id: 0,
                    name: '',
                    categories: [],
                    price: 2
                })
            }).catch((err) => {
                console.log(err)
            })
        } else {
            console.log('Attempting mood add sendind ', {
                name: state.name,
                categories: state.categories.join('*'),
                price: state.price,
                token: localStorage.getItem('token')
            })
            newMood().then((res) => {
                const { id, name, categories, price } = res.data.createMood
                console.log('got this data back after mood creation', res.data.createMood)
                const addMood = {
                    id: id,
                    name: name,
                    categories: categories,
                    price: price
                }
                handleNewMood(addMood)
                setState({
                    id: 0,
                    name: '',
                    categories: [],
                    price: 2
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    function handleAddCategory(cat): void {

        if (state.categories.length < 10) {
            setState({
                ...state,
                categories: [...state.categories, cat]
            })
        } else {
            console.log('Too many cats!')
        }
    }

    function handleRemoveFromCategories(cat): void {
        const newCats = state.categories.filter(x => x !== cat)
        setState({
            ...state,
            categories: newCats
        })
    }

    return (
        <div className="flex flex-row min-h-full min-w-full">
            <div className="flex flex-col nowrap mr-4">
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="name">What is this mood called?</label>
                    <input type="text" name="name" placeholder="i.e. Mama Mia! Pasta, baby, pasta!" onChange={changeName} value={state.name} />
                    <label htmlFor="price">How ritzy? (1-4)</label> 
                    <input type="number" name="price" id="" placeholder="Price 1-4, (4 is most expensive)" onChange={changePrice} value={state.price} />

                    {state.name.length < 3 ? 
                    <div className="btn flex items-center justify-center py-5 w-full bg-gray-400 text-white font-medium uppercase rounded transition duration-150 ease-in-out" >Name this mood</div>
                    :
                    !state.price?
                        <div className="btn flex items-center justify-center py-5 w-full bg-gray-400 text-white font-medium uppercase rounded transition duration-150 ease-in-out" >How pricey?</div>
                    :
                    state.categories.length === 0 ?
                    <div className="btn flex items-center justify-center py-5 w-full bg-gray-400 text-white font-medium uppercase rounded transition duration-150 ease-in-out" >Select some categories</div>
                    :
                    <button type="submit" className="btn flex items-center justify-center py-5 w-full bg-slate-900 text-white font-medium uppercase rounded hover:bg-green-700 transition duration-150 ease-in-out" >Submit!</button>
                }

                </form>
                <br />
                <ul className="overflow-scroll overflow-x-hidden">
                    <h1>Categories selected: </h1>
                    {state.categories.length === 10 ? <p className="error">Max categories reached!</p> : null}
                    {state.categories.map((cat, idx) => <YelpCat cat={cat} key={idx} handleRemoveFromCategories={handleRemoveFromCategories} />)
                    }
                </ul>
            </div>
            <FilterScroll handleAddCategory={handleAddCategory} picked={state.categories} />  
        </div>
    )
}