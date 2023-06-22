
import Button from "./Button";


import { motion } from "framer-motion";
import { useState } from "react";
import { useForm,useController  } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import Header from "./Header";
import SvgComponent from '../assets/logo-no-background.png'
import Swal from 'sweetalert2'
const RegisterForm = () => {
	const navigate = useNavigate();
	const [visiblePassword, setVisiblePassword] = useState({
		password: false,
		passwordRetry: false,
	});

	const handlePasswordType = (passwordInput) => {
		setVisiblePassword({
			...visiblePassword,
			[passwordInput]: visiblePassword[passwordInput] ? false : true,
		});
	};

const[skey,setskey]=useState("1");

const handlesc=(e)=>{
setskey(e.target.value);
console.log(skey);
}
	


	// destructuring useForm
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control
	} = useForm({
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	const languageList = [
		{ value: 1, label: 'Admin' },
		{ value: 2, label: 'User' }
	  ];
	  const { field: { value: langValue, onChange: langOnChange, ...restLangField } } = useController({ name: 'usertype', control });

	const onSubmit = async(data) => { 
	console.log(data);
    //data.preventDefault();
    if(langValue=="1"&&skey!=process.env.REACT_APP_SECRET_KEY)
	{
		Swal.fire({
			title: 'Error!',
			text: 'Invalid Secret Key ',
			icon: 'error',
			confirmButtonText: 'Retry'
			})
		
	}
	else{
    const { name, email, password ,usertype} = data;
	
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
		usertype:usertype,
      }),
    });

	const dataa = await res.json();
 
    if (dataa.status === 400 || !dataa|| dataa.error) {
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
			navigate("/login");
    }
    
   
}
  };


	return (
		<>
			<Header/>
	
		<motion.section
			className="register"
			initial={{ width: 0 }}
			animate={{ width: "auto", transition: { duration: 0.5 } }}
			exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
		>
			<img src={SvgComponent} alt="" />
			<p>
			Still not registered?<br /> So, before picking up your best friend, we need some data:
			
			</p>
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



    { langValue=="1"?<div>
	  <label htmlFor="name"><br></br>Secret Key</label>
				<input
					id="sc"
					type="text"
					{...register("sc", {
						required: "Secret key is required",
						
					})}
					placeholder="Enter the secret key"
					onChange={handlesc}
				/>
				{errors.sc&& <p className="error">{errors.sc.message}</p>}
				</div>:null}


	
				<label htmlFor="name">Name</label>
				<input
					id="name"
					type="text"
					{...register("name", {
						required: "Your name is required",
						maxLength: {
							value: 25,
							message: "The maximum number of characters is 25",
						},
					})}
					placeholder="Enter your full name"
				/>
				{errors.name && <p className="error">{errors.name.message}</p>}

				<label htmlFor="email">E-mail</label>
				<input
					id="email"
					type="email"
					{...register("email", {
						required: "An email address is required",
						pattern:
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					})}
					placeholder="Enter your email address"
				/>
				{errors.email && (
					<p className="error">
						{errors.email.message || "Please verify the email entered."}
					</p>
				)}

				<label htmlFor="pass-create">Password</label>
				<span>
					<span
						onClick={() => handlePasswordType("password")}
						className="pass__view"
					></span>
					<input
						id="pass-create"
						type={visiblePassword.password ? "text" : "password"}
						{...register("password", {
							required: "Create a password",
							pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
						})}
						placeholder="Create a password"
					/>
				</span>
				{errors.password && (
					<p className="error">
						{errors.password.message ||
							"The password must contain at least one capital letter, one number and be between 6 and 15 characters long"}
					</p>
				)}

				<label htmlFor="pass-confirm">Confirme sua senha</label>
				<span>
					<span
						onClick={() => handlePasswordType("passwordRetry")}
						className="pass__view"
					></span>
					<input
						id="pass-confirm"
						type={visiblePassword.passwordRetry ? "text" : "password"}
						{...register("confirm_password", {
							required: "Repeat the password created above",
							validate: (value) => {
								if (watch("password") !== value) {
									return "Passwords don't match";
								}
							},
						})}
						placeholder="Repeat the password created above"
					/>
				</span>
				{errors.confirm_password && (
					<p className="error">{errors.confirm_password.message}</p>
				)}

				<Button type="submit" children="Register" />
			</form>
		</motion.section>
		</>
	);
};

export default RegisterForm;
