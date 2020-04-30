const dburl= require('../DbUrl');
const express=require ('express');
const Joi=require ('joi');
const cors=require ('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose= require('mongoose');
const app= express();
app.use(cors());
mongoose.connect(dburl);
mongoose.connection.once('open',()=>
{
    console.log("Connected to db");
});

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

const port = process.env.PORT || 5001;
app.listen(port,()=>
console.log('Listening on 5001')
);
