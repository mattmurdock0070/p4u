var userdb = require("../models/animallist.js");
var User = require("../models/register.js");
const twilio = require('twilio');

// Twilio credentials and phone number
accountSid = 'AC98801fedc4eab84aa8841f2250065f3e'; // Replace with your Account SID
authToken = 'd2521321ea8d1f0f86c0daaf66a83695'; // Replace with your Auth Token
twilioPhoneNumber = '+12097484090'; // Replace with your Twilio number

const client = twilio(accountSid, authToken);

exports.addanimal = async (req, res) => {
    const { name, img,city,behaviour,size,age } = req.body;
    //console.log(req.body)
    if (!name || !img||!city||!behaviour||!size||!age) {
      res.status(400).json({ error: "fill all details" });
     // console.log("None of the fields can be empty");
    }
    try {
      
      const user = new userdb({
        name,img,city,behaviour,size,age
      });
      const signUp = await user.save();
      if (signUp) {
       
       
        const users = await User.find({});

        // Send SMS to each user
       users.forEach(user => {
          const message = `A new pet has been added: ${name}, ${city}, ${age} years old. Description: ${behaviour}`;
          client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: `+91${user.phone}`
          })
            .then(response => console.log('SMS sent:', response.sid))
            .catch(error => console.error('Failed to send SMS:', error));
        });
    
        res.status(201).json({ success: true, message: 'Pet added and users notified!' });



      } else {
        res.status(400).json({ error: "Animal addition Failed" });
      }
    } catch (err) {
      //console.log(err);
    }
  };


  exports.editanimal = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Data to be updated cannot be empty" });
    }
    const id = req.params.id;
   //console.log(id);
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
  
