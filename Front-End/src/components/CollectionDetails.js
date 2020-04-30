import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getDetails} from '../queries/queries';

class CollectionDetails extends Component{
  displayDetails(){
   const {collection}= this.props.data;
   if(collection){
    return (
      <div>
        <h2> {collection.name} </h2>
        <p> {collection.user.name} </p>
        <p> other collections by user: </p>
        <ul className="other-collection">
          {
            collection.user.collections.map(other => {
                return <li key={other.id}> {other.name} </li>
            })
          }
        </ul>
      </div>
    )
   }
   else{
     return (
       <div>
         <h2> No Selection </h2>
       </div>
     )
   }
  }

  render(){
    console.log(this.props);
    return (
      <div id="collection-details">
        <p>
        Collection Details:
        </p>
        {this.displayDetails()}
      </div>
    )
  }
}
export default graphql(getDetails,{
options:(props) => {
  return{variables:{id:props.collectionid}}
}
}) (CollectionDetails);
