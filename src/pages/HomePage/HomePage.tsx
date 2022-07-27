import * as React from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'

export default function HomePage() {
    const queryLinks = gql`
    query Query {
        feed {
            id
            url
            description
        }
    }
`

    function Links() {
        const { loading, error, data } = useQuery(queryLinks)
        if (loading) return <p>'Loading...'</p>
        if (error) return <p>{`Error! ${error.message}`}</p>

        return (
            <h1>{data.feed.map((item:any)=><p>{item.description}</p>)}</h1>
        )
    }

    return (
        <div className="page">
            {Links()}
        </div>
    )
}
