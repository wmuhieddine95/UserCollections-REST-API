import {gql} from 'apollo-boost';

const getUserQuery = gql`
{
  users{
    name,
    id,
  }
}`;

const getCollectionQuery = gql`
{
  collections{
    name,
    id,
  }
}`;
//$name:String!,$value:Int,$uid:ID!
//name:"$name",uid:"$uid"
const addCollection = gql`
mutation($name:String!,$value:Int,$uid:ID!)
{
    addCollection(name:$name,value:$value,uid:$uid){
      name,
      id
    }
  }
`;

const addUser = gql`
mutation($name:String!,$experience:Int)
{
    addUser(name:$name,experience:$experience){
      name,
      id
    }
  }
`;

const getDetails = gql`
query($id:ID!)
{
    collection(id:$id){
      id,
      name,
      user{
        id,
        name,
        collections{name}
      }
    }
  }
`;

export {getUserQuery,getCollectionQuery,addCollection,addUser,getDetails};
