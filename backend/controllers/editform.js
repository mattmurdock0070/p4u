var userdb = require("../models/register.js");

exports.editform = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to be updated cannot be empty" });
  }
  const id = req.params.id;
  const { name, phone, city ,message } = req.body;
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



  