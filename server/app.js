const express = require('express');
const dotenv = require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schemas/schema');
const generalConfig = require('./Config/general.config');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.set('API_SECRET_KEY', generalConfig.API_SECRET_KEY);
require('./Config/database.config');
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development'
}));



app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portundan dinleniyor...`);
});
