import Button from '../Button';
import React, {  useEffect } from "react";
import useState from 'react-usestateref'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import Header from "../Header";
import loggedUser from '../../assets/usernew.png';

import Swal from 'sweetalert2'

const Addanimal = () => {
 

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
     
     
      
    } catch (err) {
      navigate("/login");
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



  const handleFileUpload = async (e) => {
  
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setuserdata({ ...data, img : base64 })
    
  }



  const onSubmit = async() => {
   
    console.log(data);
   
      const name=ref.current.name;
      const img=ref.current.img;
      const city=ref.current.city;
      const behaviour=ref.current.behaviour;
      const size=ref.current.size;
      const age=ref.current.age;

   
      const res = await fetch("http://localhost:5000/addanimal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
         name:name,
         img:img,
         city:city,
         behaviour:behaviour,
         size:size,
         age:age,

        }),
      });
  
    const dataa = await res.json();
   console.log(dataa);
   
    if(dataa.error||dataa.status === 422 || dataa.status===400|| dataa.status===404||dataa.status===500)
    {
      Swal.fire({
        title: 'Error!',
        text: 'Some Error occurred',
        icon: 'error',
        confirmButtonText: 'Retry'
        })
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'Registration Successful',
          icon: 'success',
          confirmButtonText: 'Success',
          timer: '2000'
          })
          
        navigate("/adminhome")
      }
     
     
  
    };

  return (
    <>
      <Header/>
   
    <motion.section className='message' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      {
        
          <>
        
            <p>Add a new friend to the list:</p>
            <form onSubmit={handleSubmit(onSubmit)}>


            <label htmlFor="img">
          <img src={ref.current.img||loggedUser} alt="" />
        </label>

        <input 
          type="file"
          name="img"
          id='img'
          accept='.jpeg, .png, .jpg'
          {...register('img', { })}
          onChange={(e) => handleFileUpload(e)}
         />


              <label htmlFor="name">Name of pet</label>
              <input id='name' type="text" {...register("name", { required: 'Name is required', maxLength: { value: 40, message: 'The maximum number of characters should be 40' } })} onChange={handleEdit} placeholder='Enter pets name' />
              {errors.name && <p className="error">{errors.name.message}</p>}
              


              


              
              <label htmlFor="city">city</label>
              <input id='city' type="text" {...register("city", { required: 'City is required',  })} onChange={handleEdit} placeholder='Where does the pet stay?' />
              {errors.city && <p className="error">{errors.city.message}</p>}


              <label htmlFor="size">size</label>
              <input id='size' type="text" {...register("size", { required: 'Size is required', maxLength: { value: 40, message: 'The maximum number of characters should be 40' } })} onChange={handleEdit} placeholder='What is the size of pet?' />
              {errors.size && <p className="error">{errors.size.message}</p>}


              <label htmlFor="age">Age</label>
              <input id='age' type="text" {...register("age", { required: 'Age is required', maxLength: { value: 25, message: 'The maximum number of characters should be 25' } })} onChange={handleEdit} placeholder='What is the pets age?' />
              {errors.age && <p className="error">{errors.age.message}</p>}


              <label htmlFor="behaviour">Behaviour</label>
              <textarea name="behaviour" id="behaviour" cols="30" rows="10" {...register('behaviour', { maxLength: { value: 500, message: 'The maximum number of characters should be 500' } })} onChange={handleEdit} placeholder='Any special behaviour that you want to inform about the pet.' spellCheck='false'></textarea>
              {errors.behaviour && <p className="error">{errors.behaviour.message}</p>}

             


              

              <Button type='submit' children='Add to list' />
            </form>
          </>
       
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

export default Addanimal;

