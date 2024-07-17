import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Header from "./Header";
import loggedUser from "../assets/usernew.png";
import Swal from "sweetalert2";
import Button from "./Button";

const bu = process.env.REACT_APP_BASEURL;
const cloudinaryUploadPreset = "txzq9zlc";

const Message = () => {
  const location = useLocation();
  const [data, setUserData] = useState({});
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("jwtoken");

  useEffect(() => {
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
          throw new Error("Unauthorized");
        }

        const userData = await res.json();
        setUserData(userData);
      } catch (err) {
        navigate("/login");
      }
    };

    login();
  }, [bu, navigate, token]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const handleFileUpload = async (e) => {
    setLoading(true); // Set loading state to true when file upload starts
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryUploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dkzp6m6ls/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setUserData(prevData => ({
        ...prevData,
        image: data.secure_url,
      }));
    } catch (error) {
     // console.error('Error uploading image:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to upload image',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false); // Set loading state to false after upload completes (success or failure)
    }
  };

  const onSubmit = async (formDataInput) => {
    try {
      const res = await fetch(`${bu}/editform/${data._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          city: data.city,
          message: data.message,
          image: data.image,
        }),
      });

      const dataa = await res.json();
      if (dataa.error || dataa.status === 422 || dataa.status === 400 || dataa.status === 404 || dataa.status === 500) {
        Swal.fire({
          title: 'Error!',
          text: 'Please enter valid details',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'Updation Successful',
          icon: 'success',
          confirmButtonText: 'Success',
          timer: 2000
        });
        if (data.usertype === '1') {
          navigate("/adminhome");
        } else {
          navigate("/userhome");
        }
      }
    } catch (err) {
      //console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setUserData({ ...data, [name]: value });
  };

  return (
    <>
      <Header />
      <motion.section className='message' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
        {data.usertype === '2' && <p>This is the profile that appears to officials or NGOs that receive your message.</p>}
        <form onSubmit={handleSubmit(onSubmit)} >
          <legend>Profile</legend>

          <label htmlFor="image">
            <img src={loading ? loggedUser : data.image || loggedUser} alt="" />
            {loading && <div className="loader">Uploading image...</div>} 
          </label>
          <input
            type="file"
            name="image"
            id='image'
            accept='.jpeg, .png, .jpg'
            {...register('image', {})}
            onChange={(e) => handleFileUpload(e)}
          />

          <label htmlFor="name">Name</label>
          <input id='name' type="text" {...register("name", { maxLength: { value: 40, message: 'The maximum number of characters is 25' } })} value={data.name || ''} placeholder='Enter your full name' onChange={handleEdit} />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <label htmlFor="phone">Telephone</label>
          <input type="tel" id='phone' {...register('phone', { pattern: /\(?[1-9]{2}\)?\s?9?[0-9]{8}/ })} placeholder='Enter your phone number' value={data.phone || ''} onChange={handleEdit} />
          {errors.phone && <p className="error">{errors.phone.message || 'Please verify the number entered'}</p>}

          <label htmlFor="city">Address</label>
          <input type="text" id='city' {...register('city', {})} placeholder='Enter your Address' value={data.city || ''} onChange={handleEdit} />

          <label htmlFor="about">About</label>
          <textarea spellCheck='false' name="about" id="about" cols="30" rows="8" value={data.message || ''} placeholder='Enter your message or other details you wish to share' {...register('message', {})} onChange={handleEdit}></textarea>

          <Button type='submit'>UPDATE</Button>
        </form>
      </motion.section>
    </>
  );
};

export default Message;
