var userdb = require("../models/animallist.js");

exports.addanimal = async (req, res) => {
    const { name, img,city,behaviour,size,age } = req.body;
    console.log(req.body)
    if (!name || !img||!city||!behaviour||!size||!age) {
      res.status(400).json({ error: "fill all details" });
      console.log("None of the fields can be empty");
    }
    try {
      
      const user = new userdb({
        name,img,city,behaviour,size,age
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


  exports.editanimal = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Data to be updated cannot be empty" });
    }
    const id = req.params.id;
   console.log(id);
    userdb.findByIdAndUpdate(id,   req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update a user with ${id} , Maybe User not found`,
          });
        } else {
          return res.status(201).send({ message: "success" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user false Information " });
      });
  };
  
