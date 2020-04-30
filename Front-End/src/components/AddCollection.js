import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {getUserQuery,addCollection,getCollectionQuery} from '../queries/queries';

class AddCollection extends Component{

  constructor(props){
    super(props);
    this.state={
      name:"",
      value:1,
      uid:""
    };
  }

  getUsers(){
    //var data = this.props.data;
    var data = this.props.getUserQuery;
    if(data.loading)
      return(<option disabled> Loading Users </option>);
    else
      return data.users.map(user => {
        return (<option key={user.id} value={user.id}> {user.name} </option>);
      });
  }

  submitForm(e){
    e.preventDefault();
    this.props.addCollection({
      variables:{
        name: this.state.name,
        value:this.state.value,
        uid:this.state.uid
      },
      refetchQueries: [{query: getCollectionQuery}]
    });
    console.log(this);
   }

  render(){
    return(
      <form id="add-collection" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Collection Name:</label>
          <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
        </div>
        <div className="field">
          <label>User:</label>
          <select onChange={(e)=>this.setState({uid:e.target.value})}>
            <option>Select User</option>
            {this.getUsers()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

//export default graphql(getUserQuery)(AddCollection);
export default compose(
  graphql(getUserQuery,{name:"getUserQuery"}),
  graphql(getCollectionQuery,{name:"getCollectionQuery"}),
  graphql(addCollection,{name:"addCollection"})
)(AddCollection);
