import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useState from 'react-usestateref'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Cookies from "universal-cookie";

const Viewanimal = () => {
    const [petsdata,setpetsdata,ref]=useState([{}]);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
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

      
      
    } catch (err) {
      navigate("/login");
      
     
      
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

     

  useEffect(() => {
    login();
    getanimals();
  }, []);


  return (
    <>
    <Header/>
    <motion.section className='home' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      <p>Hello!<br /> See friends available for adoption!</p>
      <div className='cards'>
        {
          ref.current.map((pet, i) => (
            <div key={i} className='card'>
            <img src={pet.img} alt={pet.name} />
            <h4>{pet.name}</h4>
            <ul>
              <li>{pet.age}</li>
              <li>{pet.size}</li>
              <li>{pet.behavior}</li>
                
              </ul>
            
              <p className='card__city'>{pet.city}</p>
              <Link className='card__contact' to="/querypage" state={pet}>Talk to person in charge</Link>
             
            </div>
          ))
        }
      </div>
    </motion.section >
    </>
  );
};

export default Viewanimal;