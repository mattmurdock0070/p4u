const express = require("express");
const { register,login,getuser } =require("../controllers/auth.js");
const { editform } =require("../controllers/editform.js");
const authenticate = require("../middlewares/authenticate.js");
const {addanimal,editanimal}=require("../controllers/addanimal.js");
const {getanimals,deleteanimal}=require("../controllers/getanimals.js");
const {questions}=require("../controllers/questions.js");
const {getquestions,deletequestion}=require("../controllers/questions.js");
const {orders,verfiy}=require("../controllers/payments.js");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getanimals", getanimals);
router.delete("/deleteanimal/:id", deleteanimal);
router.get("/afterlogin", authenticate, (req, res) => {
    res.send(req.rootUser);
  });
router.put("/editform/:id", editform);
router.put("/editanimal/:id", editanimal);
router.post("/addanimal", addanimal);
router.post("/questionpost", questions);
router.post("/getuser", getuser);
router.get("/getquestions", getquestions);
router.delete("/deletequestion/:id", deletequestion);

router.post("/orders",orders);
router.post("/verify",verfiy);



module.exports = router;