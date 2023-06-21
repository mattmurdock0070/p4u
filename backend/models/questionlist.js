const mongoose = require("mongoose");


var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
   email: {
    type: String,
    required: true,
  },
  animalname: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  
},


);



const Questionlist = mongoose.model("questiondb", Schema);
module.exports = Questionlist;
