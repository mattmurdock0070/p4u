// styles
import Button from '../Button';
import React, {  useEffect } from "react";
import useState from 'react-usestateref'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
// dependencies
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";

// assets


const Userdetail = (props) => {
  const location = useLocation();
  // destructuring useForm

  const propsData = location.state;
  

 const [data,setuserdata,ref]=useState([]);
 const [mydata,setmyuserdata,myref]=useState([]);
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
      
     // console.log(err);
      
    }
  };



  useEffect(() => {
    login();
    getaboutuser();
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


  return (
    <motion.section className='message' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      {
        
          <>
            <p>Envie uma mensagem para a pessoa ou instituição que está cuidado do animal:</p>
            <form onSubmit={handleSubmit()}>


            <label htmlFor="name">Nome</label>
              <input id='name'  type="text" {...register("name", {  maxLength: { value: 40, message: 'O número máximo de caracteres é 40' } })} value={propsData.name}  placeholder='Insira seu nome completo'  onChange={handleEdit} />
              {errors.name && <p className="error">{errors.name.message}</p>}


              <label htmlFor="email">Email</label>
              <input id='email'  type="text" {...register("email", {  maxLength: { value: 40, message: 'O número máximo de caracteres é 40' } })} value={propsData.email}  placeholder='Insira seu nome completo'  onChange={handleEdit} />
              {errors.email && <p className="error">{errors.email.message}</p>}


              <label htmlFor="phone">Telefone</label>
              <input type="tel" id='phone' {...register('phone', { pattern: /\(?[1-9]{2}\)?\s?9?[0-9]{8}/ })} placeholder='Insira seu telefone e/ou whatsapp' value={propsData.phone} onChange={handleEdit} />
              {errors.phone && <p className="error">{errors.phone.message || 'Por favor, verifique o número digitado'}</p>}

              <label htmlFor="animalname">Nome do animal</label>
              <input id='animalname' type="text"  value={propsData.animalname}{...register("animalname", { required: 'É necessário informar o nome do animal', maxLength: { value: 25, message: 'O número máximo de caracteres é 25' } })} placeholder='Por qual animal você se interessou?' />
              {errors.animalname && <p className="error">{errors.animalname.message}</p>}

              <label htmlFor="question">Question</label>
              <textarea name="question" id="question" cols="30" rows="10" value={propsData.question}{...register('question', { required: 'É necessário escrever uma mensagem', maxLength: { value: 500, message: 'O número máximo de caracteres é 500' } })} placeholder='Escreva sua mensagem.' spellCheck='false'></textarea>
              {errors.question && <p className="error">{errors.question.message}</p>}


              
              <label htmlFor="usercity">UserCity</label>
              <input id='usercity' type="text"  value={myref.current.city}{...register("ausercity", { required: 'É necessário informar o nome do animal', maxLength: { value: 25, message: 'O número máximo de caracteres é 25' } })} placeholder='Por qual animal você se interessou?' />
              {errors.usercity && <p className="error">{errors.usercity.message}</p>}

              <label htmlFor="message">About User</label>
              <textarea name="message" id="message" cols="30" rows="10" value={myref.current.message}{...register('message', { required: 'É necessário escrever uma mensagem', maxLength: { value: 500, message: 'O número máximo de caracteres é 500' } })} placeholder='Escreva sua mensagem.' spellCheck='false'></textarea>
              {errors.message && <p className="error">{errors.message.message}</p>}

              <Button type='submit' children='Enviar' />
            </form>
          </>
        
      }
    </motion.section>
  );
};

export default Userdetail;
