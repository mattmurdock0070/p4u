const mongoose = require("mongoose");


var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    
  },
  behaviour: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  
},


);



const Animaldb = mongoose.model("animaldb", Schema);
module.exports = Animaldb;
