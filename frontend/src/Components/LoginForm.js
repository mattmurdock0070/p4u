// dependencies
import { motion } from "framer-motion";
import { useEffect, useContext,useState } from "react";
import { useForm,useController  } from "react-hook-form";
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom";
import Header from "./Header";
// components
import Button from "./Button.js";
import Select from 'react-select';
// contexts
import { AuthContext } from "../contexts/auth.js";
import SvgComponent from '../assets/logo-no-background.png'
const cookies = new Cookies();
const LoginForm = () => {
	// destructuring AuthContext
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	
	// destructuring useForm
	const {
		register,
		handleSubmit,
		formState: { errors },
		control
	} = useForm({
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	const onSubmit = async(data) => {
		
	    const { email, password,usertype } = data;
		const res = await fetch("http://localhost:5000/login", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  //credentials: 'include',
		  body: JSON.stringify({
			email,
			password,
			usertype
		  }),
		});
	
		const dataa = await res.json();
         console.log(dataa.token);
		
		 cookies.set("jwtoken", dataa.token, {
			expires: new Date(Date.now() + 25892000000),
			//httpOnly: true,
			path: "/",
		  });
		  
		  
		if (dataa.status === 400 || !dataa || dataa.error) {
		   window.alert("inSuccessfull login");
        console.log("inSuccessfull login");
			
		
		} else {
			console.log(usertype);
			if(usertype=="2")
			navigate("/userhome");
			else
			navigate("/adminhome")
		    window.alert("Successfull login");
        console.log("Successfull login");
		
		}
		
	  };

	  

	let element = "";

	const changeType = (id) => {
		element = document.querySelector(id);
		if (element.type === "password") {
			element.setAttribute("type", "text");
		} else {
			element.setAttribute("type", "password");
		}
	};



	
const languageList = [
	{ value: 1, label: 'Admin' },
	{ value: 2, label: 'User' }
  ];
  const { field: { value: langValue, onChange: langOnChange, ...restLangField } } = useController({ name: 'usertype', control }); 


	useEffect(() => { }, [element]);

	return (
		<>
			 <Header/>
		
		<motion.section
			className="register"
			initial={{ width: 0 }}
			animate={{ width: "100%", transition: { duration: 0.5 } }}
			exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
		>
			<img src={SvgComponent } alt="" />
		
			<form onSubmit={handleSubmit(onSubmit)}>


			<label>Select Role</label>
      <Select
        className='select-input'
        placeholder="Select User Type"
        isClearable
        options={languageList}
        value={langValue ? languageList.find(x => x.value === langValue) : langValue}
        onChange={option => langOnChange(option ? option.value : option)}
        {...restLangField}
      />
      {errors.usertype && <p>{errors.usertype.message}</p>}




				<label htmlFor="email">E-mail</label>
				<input
					id="email"
					type="email"
					{...register("email", {
						required: "An email address is required",
						pattern:
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					})}
					placeholder="Enter your email"
				/>
				{errors.email && (
					<p className="error">
						{errors.email.message || "Por favor, verifique o email digitado"}
					</p>
				)}

				<label htmlFor="pass">Password</label>
				<span>
					<span
						onClick={() => changeType("#pass")}
						className="pass__view"
					></span>
					<input
						id="pass"
						type="password"
						{...register("password", {
							required: "Enter correct password",
							
						})}
						placeholder="Enter your password"
					/>
				</span>
				{errors.password && (
					<p className="error">
						{errors.password.message }
					</p>
				)}

				
				<Button type="submit" children="Enter" />
				<p>Don't have an account yet?</p>
				<a href="/register" className="register__newUser">Make your registration</a>
			</form>
		</motion.section>
		</>
	);
};

export default LoginForm;
