var userdb = require("../models/questionlist.js");

exports.questions = async (req, res) => {
  const { img, name, phone, email, animalname, question } = req.body;
  if (!img || !name || !phone || !email || !animalname || !question) {
    res.status(400).json({ error: "fill all details" });
    console.log("None of the fields can be empty");
  }
  try {
    const user = new userdb({ img, name, phone, email, animalname, question });
    const signUp = await user.save();
    if (signUp) {
      res.status(201).json({ message: "Animal addition Successful" });
    } else {
      res.status(400).json({ error: "Animal addition Failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function fetchQuestions() {
  try {
    const data = await userdb.find();
    return data;
  } catch (err) {
    console.error("Error fetching questions from MongoDB:", err);
    throw new Error("Error fetching questions from MongoDB");
  }
}

exports.getquestions = async (req, res) => {
  try {
    const data = await fetchQuestions();
    if (!data) {
      console.log("No animal found");
      res.status(404).json({ error: "No animal found" });
    } else {
      res.send(data);
    }
  } catch (err) {
    console.log("No animal");
    res.status(500).send({ message: "Some error occurred" });
  }
};

exports.deletequestion = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userdb.deleteOne({ _id: id });
    if (!data) {
      console.log("No animal found");
      res.status(404).json({ error: "No animal found" });
    } else {
      res.send(data);
    }
  } catch (err) {
    console.log("No animal");
    res.status(500).send({ message: "Some error occurred" });
  }
};

exports.fetchQuestions = fetchQuestions;
