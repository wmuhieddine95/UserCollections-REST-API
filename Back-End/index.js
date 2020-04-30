const express=require ('express');
const app= express();
const Joi=require ('joi');
const cors = require('cors');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());
app.options('*', cors());
const {client}=require ('./mongoclient');
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Hello World!!!');
}
);

app.get('/api/collection',(req,res)=>{
  client.connect(err => {
  const collection = client.db("myfirstapi").collection("document1");
    // perform actions on the collection object
  collection.find({}).toArray(function(err, items) {
  console.log(items);
  res.send(items);
  });
    client.close();
  });
}
);

app.get('/api/collection/:id',(req,res)=>{
  client.connect(err => {
  const collection = client.db("myfirstapi").collection("document1");
  // perform actions on the collection object
  collection.find({"id":req.params.id}).toArray(function(err, item) {
  //const toSend = collection.find(c => c.id===parseInt(req.params.id));
  const toSend = item;
  if(!toSend) res.status(404).send('The object is not found in the collection');
  res.send(toSend);
  });
});
});

app.post('/api/collection',(req,res)=>{
  const schema = {
    name : Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body,schema);
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  client.connect(err => {
  const collection = client.db("myfirstapi").collection("document1");
  // perform actions on the collection object
  collection.find({}).toArray((err,items) => {
    var pk=items.length +1 || 1;
    const id = pk.toString();
    const newObject = {
    id: id,
    name: req.body.name
    };
    collection.insertOne(newObject,(err, item) => {
    if(err) return res.status(500).send(error);
    res.send(item);
  });
  //collection.push(newObject);
  res.send(newObject);
}
);
});
});

app.put('/api/collection/:id',(req,res)=>{
  client.connect(err => {
  const collection = client.db("myfirstapi").collection("document1");
  // perform actions on the collection object
    collection.find({"id":req.params.id}).toArray((err,item) => {
      if(err) console.log(err);
      const toUpdate = item;
      if(!toUpdate) res.status(404).send('The object is not found in the collection');
      const schema = {
        name : Joi.string().min(3).required()
      };
      const result = Joi.validate(req.body,schema);
      if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
      }
      let newUpdate = toUpdate;
      newUpdate.name=req.body.name;
      collection.updateOne(toUpdate,newUpdate,(err,result) => {
      console.log(result);
      res.send(newUpdate);
      }
    );
    });
    //const toUpdate = collection.find(c => c.id===parseInt(req.params.id));
});
});

app.delete('/api/collection/:id',(req,res)=>{
  client.connect(err => {
  const collection = client.db("myfirstapi").collection("document1");
  // perform actions on the collection object
    collection.find({"id":req.params.id}).toArray((err,item) => {
      const toDelete = item.shift();
      if(!toDelete) res.status(404).send('The object is not found in the collection');
    collection.deleteOne(toDelete,(err,result)=>{
        if(err) console.log(err);
        console.log(result);
      });
      //Local Array
      //const index = collection.indexOf(toDelete);
      //Remove 1 element at index:index
      //collection.splice(index,1);
      res.send(toDelete);
    });
});
  //const toDelete = collection.find(c => c.id===parseInt(req.params.id));
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
console.log(`Listening on ${port}`)
);
