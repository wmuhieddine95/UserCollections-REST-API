# UserCollections-REST-API
Client Server Project using Nodejs, GraphQL and React.Js connected to MongoDB by mongoose with CRUD features.
## Project Topology:
  a) FrontEnd:
  -> Client Side = React
  -> GraphQL Client = Apollo
  b) Backend:
  -> Express
  -> GraphQL Server
  c) Database:
  -> MongoDb Atlas database using mongoose library for connection and Schemas (Data Structure)
## Libraries
1) Initialize Project
$ npm init --yes
2) Install express: having a server that send back to the user the requested service on specific endpoint (each request has its own endpoint)
$ npm i express
3) Install nodemon: avoid manually running server everytime you change the code
$ npm i nodemon
4) cors library
app that uses cors library accepts external requests (from the reactnative client)
5) joi package facilitates input validation
$ npm i joi
6) lodash => manipulating arrays while testing with dummy data
$ npm i lodash

## GraphQL
### Graphql is used to querying server with a single HTTP request
### Even if it is a complex query with relationships
### It uses graphs where it is settled on a point on the graph and it is able to start moving from point to point
### GraphQLID when queried it takes the value with quotation or without quotation
### Created Types fields is defined by functions to maintain relationships between Types
### In GraphiQL By default expects queries (Requesting Data)
### Creating a mutation for inserting or modifying data
