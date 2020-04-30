const graphql=require('graphql');
const {
  GraphQLObjectType,
   GraphQLID,GraphQLString,
    GraphQLInt,
     GraphQLSchema,
      GraphQLList,
    GraphQLNonNull} = graphql;
const _=require('lodash');
const User= require('../models/user');
const Collection= require('../models/collection');
//Dummy database
/*var dummydb= [
  {id: 'abcd',name: 'col1',uid:'1',value:8},
  {id: 'efg',name: 'col2',uid:'3',value:6},
  {id: 'hij',name: 'col3',uid:'2',value:5},
  {id: 'klmn',name: 'col4',uid:'4',value:7},
  {id: 'opqrs',name: 'col5',uid:'2',value:11},
  {id: 'tuvw',name: 'col6',uid:'3',value:2},
  {id: 'xyz',name: 'col7',uid:'3',value:4}
];*/
//DummyUserDb
/*var userdb= [
  {id: '1',name: 'usr1',experience:2},
  {id: '2',name: 'usr2',experience:4},
  {id: '3',name: 'usr3',experience:6},
  {id: '4',name: 'usr4',experience:1}
];*/

const ColDataType = new GraphQLObjectType({
  name:'Collection',
  fields:() => ({
    id: {type:GraphQLID},
    name: {type: GraphQLString},
    value:{type: GraphQLInt},
    user: {
      type: UserType,
      resolve(parent,args){
        return User.findById(parent.uid);
        //console.log(parent);
        //return _.find(userdb,{id:parent.uid});
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name:'User',
  fields:() => ({
    id: {type:GraphQLID},
    name: {type: GraphQLString},
    experience:{type: GraphQLInt},
    collections: {
      type: new GraphQLList(ColDataType),
      resolve(parent,args){
        return Collection.find({uid:parent.id});
        //console.log(parent);
        //return _.filter(dummydb,{uid:parent.id});
      }
    }
  })
});

//args are the parameter of the query
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    collection:{
      type: ColDataType,
      args: {id:{type:GraphQLID}},
      resolve(parent,args){
        return Collection.findById(args.id);
        //code to get Data from database
          //return _.find(dummydb,{id:args.id});
  }
},
    user:{
      type: UserType,
      args: {id:{type:GraphQLID}},
      resolve(parent,args){
        return User.findById(args.id);
        //code to get data
          //return _.find(userdb,{id:args.id});
      }
    },
    collections:{
      type:new GraphQLList(ColDataType),
      resolve(parents,args)
      {
        return Collection.find({});
      }
    },
    users:{
      type:new GraphQLList(UserType),
      resolve(parents,args)
      {
        return User.find({});
        //console.log(parents);
        //return userdb;
      }
    }
  }
});

const Mutation= new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addUser:{
      type:UserType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        experience:{type:GraphQLInt}
      },
      resolve(parent,args){
        let user=new User({
          name:args.name,
          experience:args.experience
        });
        return user.save()
      }
    },
    addCollection:{
      type:ColDataType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        value:{type:GraphQLInt},
        uid:{type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        let collection=new Collection({
          name:args.name,
          value:args.value,
          uid:args.uid
        });
        return collection.save()
      }
    }
}
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
