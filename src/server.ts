import { ApolloServer } from "apollo-server"
require('dotenv').config()
import { schema } from'./schema'
import { context } from "./Context"

export const server = new ApolloServer({
    schema,
    context
});

const port = process.env.PORT
server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
});