import * as React from 'react'
import Carousel from '../Carousel/Carousel'
import { Business, WelcomePageState } from '../../pages/WelcomePage/WelcomePage'

export interface WinnerDisplayProps {
    welcomePage: WelcomePageState
    moreConfetti:(num)=>void
    business?: Business
}

export interface WinnerDisplayState {
    winner: Business
}

export function WinnerDisplay({ welcomePage, business , moreConfetti}: WinnerDisplayProps) {
    console.log('Winner displaying' , business, welcomePage)
    const [state, setState] = React.useState<WinnerDisplayState>({
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
        if (welcomePage) {
            console.log('found welcome page for winner')
            let all: any = []

            for (let i = 0; i < welcomePage.ratings.length; i++) {
                all.push([welcomePage.ratings[i], welcomePage.restaurants[i]])
            }

            const top = all.filter(x => x[0] === 2)
            const mid = all.filter(x => x[0] === 1)
            const bot = all.filter(x => x[0] === 0)
            console.log('made it through filter with','t', top,'m', mid,'b', bot)
            let winner
            if (top.length) {
                winner = top[Math.floor(Math.random() * top.length)][1]
            } else if (mid.length) {
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
        } else {
            if (business) {
                console.log('no welcome page')
                setState({
                    ...state,
                    winner: business
                })
            }
        }

    }, [])

    const { name, photos, rating, price, display_phone, location, url} = state.winner

    return (
        <div className="container-long">
            {state.winner ?
                <div className="container-long">
                    <br />
                    <h1 className="italic text-6xl bold text-center min-w-full">WINNER!</h1>
                    <div className="long flex flex-col jusitfy-around items-center">
                        <div className="flex flex-col items-center">
                            <h1 className="italic text-3xl bold min-w-full text-center">{name}</h1>
                            <button className="btn flex items-center justify-center py-5 w-full bg-slate-900 text-white font-medium uppercase rounded hover:bg-blue-600 transition duration-150 ease-in-out text-5xl" onClick={()=>{moreConfetti(200)}}>🥳</button>
                            {welcomePage.confetti && welcomePage.confetti !== 3500?
                            <button className="btn flex items-center justify-center py-5 w-full bg-red-700 text-white font-medium uppercase rounded hover:bg-red-500 transition duration-150 ease-in-out" onClick={()=>{moreConfetti(-200)}}>Too much? (You're at {welcomePage.confetti} confetti's)</button>
                        :
                        null}
                            
                            <Carousel imgList={photos} />
                            <div className="w-1/2 flex flex-col justify-center items-left">
                                {rating && <h1 className="text-xl">Rating: {rating}</h1>}
                                {price && <h1 className="text-xl">Price: {price}</h1>}
                                {display_phone && <h1 className="text-xl">Need a reservation? <br />{display_phone}</h1>}
                                {location.display_address ? <h1 className="text-xl">Ready to go? <br />
                                    {location.display_address.join(', ')}</h1> : null}
                                {url? <button className="btn flex items-center justify-center py-5 w-full bg-blue-600 text-white font-medium uppercase rounded hover:bg-green-500 transition duration-150 ease-in-out" onClick={()=>{window.open(url , '_blank')}}>Need more info? Click me!</button>: null}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <h1>No Winner!</h1>
            }

        </div>
    )
}