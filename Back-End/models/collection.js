const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colSchema = new Schema({
  name: String,
  value: Number,
  uid: String
});

module.exports= mongoose.model('Collection',colSchema);
