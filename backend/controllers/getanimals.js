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
  