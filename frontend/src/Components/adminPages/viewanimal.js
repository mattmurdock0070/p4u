// dependencies
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useState from 'react-usestateref'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
// assets
//import { pets } from '../src/data/data.js';
import Header from "../Header";
// components
import CardPet from '../CardPet.js';
import loggedUser from '../../assets/usernew.png';
import Cookies from "universal-cookie";




const Viewanimal = () => {
    const [petsdata,setpetsdata,ref]=useState([{}]);

    
    const getanimals = async () => {

        try {
          const res = await fetch("http://localhost:5000/getanimals", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            
          });
         
          if (res.status === 401) {
          
            const error = new Error(res.error);
            throw error;
          }
          const data = await res.json();
          setpetsdata(data);
          console.log(ref.current);
          
          
        } catch (err) {
          navigate("/login");
          
        }
      };

    




  const navigate = useNavigate();
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
      
      
    } catch (err) {
      navigate("/login");
      
     // console.log(err);
      
    }
  };



  

  const handleclick =async (elem, idx) => {
   
   
      try {
        const res = await fetch(`http://localhost:5000/deleteanimal/${elem._id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          
        });
       
        if (res.status === 401) {
        
          const error = new Error(res.error);
          throw error;
        }
        console.log("hello");
        getanimals();
        
      } catch (err) {
        navigate("/login");
        
      }
  };

  useEffect(() => {
    login();
    getanimals();
  }, []);


  return (
    <>
       <Header/>
  
    <motion.section className='home' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      <p>Hello! <br /> These are the animals available!</p>
      <div className='cards'>
        {
          ref.current.map((pet, i) => (
            <div key={i} className='card'>
            <img src={pet.img||loggedUser} />
            <h4>{pet.name}</h4>
            <ul>
              <li>{pet.age}</li>
              <li>{pet.size}</li>
              <li>{pet.behaviour}</li>
                
              </ul>
            
              <p className='card__city'>{pet.city}</p>
              <Link className='card__contact' to="/editanimal" state={pet}>Edit the animal details</Link>
              <button className='cpb' onClick={() => { handleclick(pet, i); }}>Delete</button>
            </div>
          ))
        }
      </div>
    </motion.section >
    </>
  );
};

export default Viewanimal;