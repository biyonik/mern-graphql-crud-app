const express = require('express');
const dotenv = require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schemas/schema');
const PORT = process.env.PORT || 5000;
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development'
}))










app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portundan dinleniyor...`);
});
