const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')

const {zooSchema} = require("./schema")

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: zooSchema,
    graphiql: true,
}))

app.listen(4000)