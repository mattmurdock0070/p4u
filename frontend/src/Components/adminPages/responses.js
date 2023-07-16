import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useState from 'react-usestateref'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Header from "../Header";
import Swal from 'sweetalert2'
const bu=process.env.REACT_APP_BASEURL
const Responses = () => {
    const [petsdata,setpetsdata,ref]=useState([{}]);

    
    const getanimals = async () => {

        try {
          const res = await fetch(`${bu}/getquestions`, {
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
          
          
          
        } catch (err) {
          navigate("/login");
          
        }
      };

    




  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("jwtoken");
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const login = async () => {

    try {
      const res = await fetch(`${bu}/afterlogin`, {
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



  

  const handleclick1 =async (elem, idx) => {
   
   
      try {
        const res = await fetch(`${bu}/deletequestion/${elem._id}`, {
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
        Swal.fire({
          title: 'Success!',
          text: 'Response Deleted',
          icon: 'success',
          confirmButtonText: 'Success',
          timer: '2000'
          })
        getanimals();
        
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: 'Deletion Failed',
          icon: 'error',
          confirmButtonText: 'Retry'
          })
      }
  };

  const handleclick =async (elem, idx) => {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
  }).then((result) => {
    if (result.dismiss !== 'cancel') {

      handleclick1(elem,idx);
    }
   
})
 
   
  };
  
  

  useEffect(() => {
    login();
    getanimals();
  }, []);


  return (
    <>
      {ref.current.usertype==="2"&&navigate("/login")}
       <Header/>
   
    <motion.section className='home' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      <p>These are some active resopnses!</p>
      <div className='cards'>
        {
          ref.current.map((pet, i) => (
            <div key={i} className='card'>
            <img src={pet.img} alt={pet.name} />
            <h4>{pet.name}</h4>
            <ul>
              <li>{pet.phone}</li>
              <li>{pet.email}</li>
              <li>{pet.animalname}</li>
                
              </ul>
            
              <p className='card__city'>{pet.question}</p>
              <Link className='card__contact' to="/getuserdetail"  state={pet}>Get More Details About User</Link>
              <button className='cpb' onClick={() => { handleclick(pet, i); }}>Delete Question</button>
            </div>
          ))
        }
      </div>
    </motion.section >
    </>
  );
};

export default Responses;