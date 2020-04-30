import React,{Component} from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
//UI components
import CollectionList from './components/CollectionList'
import AddCollection from './components/AddCollection'

//Apollo Client
const client=new ApolloClient({
  uri:"http://localhost:5001/graphql"
})

class App extends Component{
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="App">
          <h1> List collection: </h1>
          <CollectionList/>
          <AddCollection/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
