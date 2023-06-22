import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import Header from "../Header";
import useState from 'react-usestateref'
import { Helmet } from 'react-helmet';
import SvgComponent from '../../assets/logo-no-background3.png'

import Cookies from "universal-cookie";



const AdminHome = () => {
  const matches = useMediaQuery('(max-width: 767px)');
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [data,setuserdata,ref]=useState([]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
      setuserdata(data);
    
    } catch (err) {
      navigate("/login");
      
   
      
    }
  };

  useEffect(() => {
    login();
  }, []);


  return (
    <>
    {ref.current.usertype==="2"&&navigate("/login")}
    <Header/>
    
    <motion.section className='initial' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
    <Helmet>
      <style>{"body { background-color: #3874ff; }"}</style>
    </Helmet>
    <img src={ SvgComponent }  alt="Logo " />
    <h3>Hello Admin!</h3>
    <p>
     'What do you want to do?
    </p>
    <div className='home__buttons'>
      <Link className='button' to='/viewanimal'>View Animal List</Link>
    </div>
    <div className='home__buttons'>
      <Link className='button' to='/addanimal'>Add Animal to List</Link>
    </div>
    <div className='home__buttons'>
      <Link className='button' to='/responses'>See Responses</Link>
      
    </div>
  </motion.section >
  </>
  );
};

export default AdminHome;