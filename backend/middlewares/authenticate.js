const jwt = require("jsonwebtoken");
const User = require("../models/register.js");

const authenticate = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    //console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
   
    res.status(401).send({message:"unauthorized"});
    //console.log(err);
  }
};
module.exports = authenticate;
