var userdb = require("../models/questionlist.js");

exports.questions = async (req, res) => {
    const { img,name, phone,email,animalname,question } = req.body;
    if (!img||!name || !phone||!email||!animalname||!question) {
      res.status(400).json({ error: "fill all details" });
      console.log("None of the fields can be empty");
    }
    try {
      
      const user = new userdb({
        img,name, phone,email,animalname,question
      });
      const signUp = await user.save();
      if (signUp) {
       
        res.status(201).json({ message: "Animal addition Successful" });
      } else {
        res.status(400).json({ error: "Animal addition Failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  exports.getquestions = async (req, res) => {
    try {
     
      userdb.find()
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
  

  exports.deletequestion = async (req, res) => {
    try {
      const id = req.params.id;
      userdb.deleteOne({_id:id})
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
  