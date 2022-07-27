import { ApolloServer } from "apollo-server"
require('dotenv').config()
import { schema } from'./schema'

export const server = new ApolloServer({
    schema,
});

const port = process.env.PORT
server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
});