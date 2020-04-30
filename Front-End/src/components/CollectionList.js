import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getCollectionQuery} from '../queries/queries';
import CollectionDetails from './CollectionDetails'

class CollectionList extends Component{
  constructor(props){
    super(props);
    this.state={
      selected:null
    }
  }

  displayCollections(){
    var data = this.props.data;
    if(data.loading)
      return(<div> Loading... </div>);
    else
      return data.collections.map(collection => {
        return(
          <li key={collection.id} onClick={(e) =>
             {this.setState({ selected: collection.id })}}>
              {collection.name}
         </li>
        );
      });
  }

  render(){
    return (
    <div>
        <ul id="col-list">
          {this.displayCollections()}
        </ul>
      <CollectionDetails collectionid={this.state.selected}/>
    </div>
    )
  }
}
export default graphql(getCollectionQuery)(CollectionList);
