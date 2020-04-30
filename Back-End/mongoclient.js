const uri= require('../DbUrl');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });
module.exports={client};
