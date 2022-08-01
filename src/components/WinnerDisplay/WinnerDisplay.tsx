import * as React from 'react'
import Carousel from '../Carousel/Carousel'
import { Business, WelcomePageState } from '../../pages/WelcomePage/WelcomePage'

export interface WinnerDisplayProps {
    welcomePage: WelcomePageState
}

export interface WinnerDisplayState {
    winner: Business
}

export function WinnerDisplay({ welcomePage }: WinnerDisplayProps) {
    const [state, setState] = React.useState({
        winner: {
            name: '',
            photos: [],
            rating: 3,
            price: 2,
            display_phone: '123-456-7890',
            location: {
                display_address: ['123', '456']
            }
        }
    })

    React.useEffect(() => {
        let all: any = []

        for (let i = 0; i < welcomePage.ratings.length; i++) {
            all.push([welcomePage.ratings[i], welcomePage.restaurants[i]])
        }

        const top = all.filter(x => x[0] === 2)
        const mid = all.filter(x => x[0] === 1)
        const bot = all.filter(x => x[0] === 0)

        let winner
        if (top) {
            winner = top[Math.floor(Math.random() * top.length)][1]
        } else if (mid) {
            winner = mid[Math.floor(Math.random() * mid.length)][1]
        } else {
            winner = bot[Math.floor(Math.random() * bot.length)][1]
        }
        console.log('AAAAND THE WINNER IS ', winner)
        setState({
            ...state, winner: {
                ...winner,
            }
        })
    }, [])

    const { name, photos, rating, price, display_phone, location } = state.winner

    return (
        <>
        <br />
        <h1 className="italic text-6xl bold">WINNER!</h1>
        <br />
            <div className="container-medium flex flex-col jusitfy-around items-center select-none">
                {state.winner ?
                    <div className="flex flex-col items-center">
                        <h1 className="italic text-3xl bold">{name}</h1>
                        <Carousel imgList={photos} />
                        <div className="w-1/2 flex flex-col justify-center items-left">
                            {rating && <h1 className="text-xl">Rating: {rating}</h1>}
                            {price && <h1 className="text-xl">Price: {price}</h1>}
                            {display_phone && <h1 className="text-xl">Need a reservation? <br />{display_phone}</h1>}
                            {location.display_address && <h1 className="text-xl">Ready to go? <br />
                                {location.display_address.join(', ')}</h1>}
                        </div>
                    </div>
                    :
                    <h1>No Winner!</h1>
                }
            </div>
            <br />
            <br />
        </>
    )
}