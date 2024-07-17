var userdb = require("../models/animallist.js");



  exports.getanimals = async (req, res) => {

    
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


  async function fetchAnimals() {
    try {
      const data = await userdb.find();
      return data;
    } catch (err) {
      console.error("Error fetching questions from MongoDB:", err);
      throw new Error("Error fetching questions from MongoDB");
    }
  }
  

  exports.deleteanimal = async (req, res) => {
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
  exports.fetchAnimals = fetchAnimals;