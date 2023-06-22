import React, {  useEffect } from "react";
import useState from 'react-usestateref'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from "../Header";

const Userdetail = (props) => {
  const location = useLocation();
  

  const propsData = location.state;
  

 const [data,setuserdata,ref]=useState([]);
 const [mydata,setmyuserdata,myref]=useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const cookies = new Cookies();
  const token = cookies.get("jwtoken");
  const login = async () => {

    try {
      const res = await fetch("http://localhost:5000/afterlogin", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      });
     
      if (res.status === 401) {
      
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      console.log(data);
      setuserdata(data);
     
      
    } catch (err) {
      navigate("/login");
      
     
      
    }
  };


  const getaboutuser = async () => {

    try {
      const res = await fetch("http://localhost:5000/getuser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          
          email: propsData.email,
        
        }),
        
      });
     
      if (res.status === 401) {
      
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      console.log(data);
      setmyuserdata(data);
     
      
    } catch (err) {
      navigate("/login");
      
    
      
    }
  };



  useEffect(() => {
    login();
    getaboutuser();
  }, []);
  

  
  return (
    <>
       <Header/>
   
    <motion.section className='message' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      {
        
          <>
            <p>These are the details and questions entered by the user:</p>
            <form >


            <label htmlFor="name">Name</label>
              <input id='name'  type="text" value={propsData.name}    />
           

              <label htmlFor="email">Email</label>
              <input id='email'  type="text"  value={propsData.email}   />
             


              <label htmlFor="phone">Telephone</label>
              <input type="tel" id='phone'  value={propsData.phone} />
             

              <label htmlFor="animalname">Name Of animal</label>
              <input id='animalname' type="text"  value={propsData.animalname} />
          

              <label htmlFor="question">Question</label>
              <textarea name="question" id="question" cols="30" rows="10" value={propsData.question}></textarea>
         


              
              <label htmlFor="usercity">UserCity</label>
              <input id='usercity' type="text"  value={myref.current.city} />
             

              <label htmlFor="message">About User</label>
              <textarea name="message" id="message" cols="30" rows="10" value={myref.current.message}></textarea>
            

           
            </form>
          </>
        
      }
    </motion.section>
    </>
  );
};

export default Userdetail;
