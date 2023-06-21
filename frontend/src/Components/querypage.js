// styles
import Button from './Button';
import React, {  useEffect } from "react";
import useState from 'react-usestateref'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
// dependencies
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import Header from "./Header";

// assets
import loggedUser from '../assets/logged-user.png';

const Querypage = (props) => {
  const location = useLocation();
  // destructuring useForm

  const propsData = location.state;
  

 const [data,setuserdata,ref]=useState([]);
 
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
      setuserdata(data);
     
      
    } catch (err) {
      navigate("/login");
      
     // console.log(err);
      
    }
  };

  useEffect(() => {
    login();
  }, []);
  let name, value;
  const handleEdit = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuserdata({ ...data, [name]: value });
  };


  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const onSubmit = async(data) => {
   
    
     
     
      const name=ref.current.name;
      const email=ref.current.email;
      const phone=ref.current.phone;
      const animalname=data.animalname;
      const question=data.question;

    
     const res = await fetch("http://localhost:5000/questionpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email:email,
          animalname:animalname,
          question:question,
        }),
      });
  
    const dataa = await res.json();
   console.log(dataa);
   
    if(dataa.error||dataa.status === 422 || dataa.status===400|| dataa.status===404||dataa.status===500)
    {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      } else {
        window.alert("Successfull Registration");
        console.log("Successfull Registration");
        
      }
      // Redirect to the login page once the user is registered
     
    navigate("/home");
    };

  return (
    <>
    <Header/>
    <motion.section className='message' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      {
        
          <>
         
          <p>Send a message to the person or institution that is caring for the animal:</p>
            <form onSubmit={handleSubmit(onSubmit)}>


            <label htmlFor="name">Name</label>
              <input id='name'  type="text" {...register("name", {  maxLength: { value: 40, message: 'The maximum number of characters is 25' } })} value={ref.current.name}  placeholder='Enter your full name'  onChange={handleEdit} />
              {errors.name && <p className="error">{errors.name.message}</p>}


              <label htmlFor="email">Email</label>
              <input id='email'  type="text" {...register("email", {  maxLength: { value: 40, message: 'O número máximo de caracteres é 40' } })} value={ref.current.email}  placeholder='Insira seu nome completo'  onChange={handleEdit} />
              {errors.email && <p className="error">{errors.email.message}</p>}


              <label htmlFor="phone">Telephone</label>
              <input type="tel" id='phone' {...register('phone', { pattern: /\(?[1-9]{2}\)?\s?9?[0-9]{8}/ })} placeholder='Enter your phone number' value={ref.current.phone} onChange={handleEdit} />
              {errors.phone && <p className="error">{errors.phone.message || 'Please verify the number entered'}</p>}


              <label htmlFor="animalname">Name of animal</label>
              <input id='animalname' type="text"  value={propsData.name}{...register("animalname", { required: 'It is necessary to inform the name of the animal' })} placeholder='What Animal are you interested in?' />
              {errors.animalname && <p className="error">{errors.animalname.message}</p>}

              <label htmlFor="question">Message</label>
              <textarea name="question" id="question" cols="30" rows="10" {...register('question', { required: 'It is necessary to write a message', maxLength: { value: 500, message: 'Maximum digits can be 500' } })} placeholder='Enter your message' spellCheck='false'></textarea>
              {errors.question && <p className="error">{errors.question.message}</p>}

              <Button type='submit' children='Submit' />
            </form>
          </>
        
      }
    </motion.section>
    </>
  );
};

export default Querypage;

