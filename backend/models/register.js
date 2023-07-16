const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: 0,
  },
  city: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },


 
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
},


{ strict: false }
);


Schema.methods.generateAuthToken = async function () {
  try {
    let tokenUser = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokenUser });
    await this.save();
    return tokenUser;
  } catch (err) {
    console.log(err);
  }
};



const UserDB = mongoose.model("userdb", Schema);
module.exports = UserDB;
