var userdb = require("../models/register.js");

exports.register = async (req, res) => {
    const { name, email, password,usertype } = req.body;
    if (!name || !email || !password||!usertype) {
      res.status(400).json({ error: "fill all details" });
      console.log("None of the fields can be empty");
    }
    try {
      const userExists = await userdb.findOne({ email });
      if (userExists) {
        res.status(400).json({ error: "User already exists" });
      }
      const user = new userdb({
        name,
        email,
        password,
        usertype
      });
      const signUp = await user.save();
      if (signUp) {
       
        res.status(201).json({ message: "Registration Successful" });
      } else {
        res.status(400).json({ error: "Registration Failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };




  exports.login = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const usertype=req.body.usertype;
      if (!email || !password||!usertype) {
       
        return res.status(400).json({ error: "None of the feilds can be empty" });
      }
      const emailExists = await userdb.findOne({ email: email,usertype:usertype});
      const PassMatch = await userdb.findOne({ password: password });
      
      if (emailExists && PassMatch) {
        const token = await emailExists.generateAuthToken();

        res.json({token });
      } 
      else {
        res.status(400).json({ error: "Please Enter valid User Credentials" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  exports.getuser= async (req, res) => {


    const {  email} = req.body;
    if ( !email ) {
      res.status(400).json({ error: "fill all details" });
      console.log("None of the fields can be empty");
    }

    try {
     
      userdb.findOne({email:email})
        .then((data) => {
          if (!data) { console.log("No animal found");
            res.status(404).json({ err: "No animal found" });
            
          } else {
           
            res.send(data);
          }
        })
        .catch((err) => {
          console.log("No animal");
          res.status(500).send({ message: "Some error occurred" });
        });
    } catch (err) {
      console.log(err);
    }
  };