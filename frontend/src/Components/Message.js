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
import loggedUser from '../assets/usernew.png';


const Message = () => {
  const location = useLocation();
  // destructuring useForm

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
    console.log("helo");
    name = e.target.name;
    value = e.target.value;
    setuserdata({ ...data, [name]: value });
  };


  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });



  const handleFileUpload = async (e) => {
    console.log("helo");
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setuserdata({ ...data, image : base64 })
    
  }


  const onSubmit = async(data) => {
   
    
     // console.log("front"+data);
      const _id=ref.current._id;
      const name=ref.current.name;
      const phone=ref.current.phone;
      const city=ref.current.city;
      const message=ref.current.message;
      const image=ref.current.image;

    //   console.log(ref.current);
      const res = await fetch(`http://localhost:5000/editform/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          city: city,
      message:message,
      image:image,
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
     
  
    };

  return (
    <>
   <Header/>
    <motion.section className='message' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      {
        location.pathname === '/mensagem'?(
          <>
            <p>Send a message to the person or institution that is caring for the animal:</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name</label>
              <input id='name'  type="text" {...register("name", {  maxLength: { value: 40, message: 'The maximum number of characters is 25' } })} value={ref.current.name}  placeholder='Enter your full name'  onChange={handleEdit} />
              {errors.name && <p className="error">{errors.name.message}</p>}

             <label htmlFor="phone">Telephone</label>
              <input type="tel" id='phone' {...register('phone', { pattern: /\(?[1-9]{2}\)?\s?9?[0-9]{8}/ })} placeholder='Enter your phone number' value={ref.current.phone} onChange={handleEdit} />
              {errors.phone && <p className="error">{errors.phone.message || 'Please verify the number entered'}</p>}

              <label htmlFor="petName">Name of animal</label>
              <input id='petName' type="text" {...register("petName", { required: 'It is necessary to inform the name of the animal', maxLength: { value: 25, message: 'O número máximo de caracteres é 25' } })} placeholder='What Animal are you interested in?' />
              {errors.petName && <p className="error">{errors.petName.message}</p>}

              <label htmlFor="msg">Message</label>
              <textarea name="msg" id="msg" cols="30" rows="10" {...register('msg', { required: 'It is necessary to write a message', maxLength: { value: 500, message: 'O número máximo de caracteres é 500' } })} placeholder='Enter Your Message.' spellCheck='false'></textarea>
              {errors.msg && <p className="error">{errors.msg.message}</p>}

              <Button type='submit' children='Submit' />
            </form>
          </>
        ) : (
          <>
           { ref.current.usertype ==='2' && <p>This is the profile that appears to officials or NGOs that receive your message.</p>}
            <form onSubmit={handleSubmit(onSubmit)} >
              <legend>Profile</legend>


             <label htmlFor="image">
          <img src={ref.current.image||loggedUser} alt="" />
        </label>

        <input 
          type="file"
          name="image"
          id='image'
          accept='.jpeg, .png, .jpg'
          {...register('image', { })}
          onChange={(e) => handleFileUpload(e)}
         />

              <label htmlFor="name">Name</label>
              <input id='name'  type="text" {...register("name", {  maxLength: { value: 40, message: 'The maximum number of characters is 25' } })} value={ref.current.name}  placeholder='Enter your full name'  onChange={handleEdit} />
              {errors.name && <p className="error">{errors.name.message}</p>}

              <label htmlFor="phone">Telephone</label>
              <input type="tel" id='phone' {...register('phone', { pattern: /\(?[1-9]{2}\)?\s?9?[0-9]{8}/ })} placeholder='Enter your phone number' value={ref.current.phone} onChange={handleEdit} />
              {errors.phone && <p className="error">{errors.phone.message || 'Please verify the number entered'}</p>}

              <label htmlFor="city">Address</label>
              <input type="text" id='city' {...register('city', { })} placeholder='Enter your Address' value={ref.current.city} onChange={handleEdit}  />

              <label htmlFor="about">About</label>
              <textarea spellCheck='false' name="about" id="about" cols="30" rows="8" value={ref.current.message} placeholder='Enter your message or other details you wish to share' {...register('message', {})} onChange={handleEdit}></textarea>

              <Button type='submit' children='Submit' />
            </form>
          </>
        )
      }
    </motion.section>
    </>
  );
};

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}


export default Message;

