
import { motion } from "framer-motion";
import {  useEffect} from 'react';
import useState from 'react-usestateref'
import { useForm,useController  } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SvgComponent from '../assets/logo-no-background.png'
import Cookies from "universal-cookie";
import Button from "./Button.js";
import axios from "axios";
import Swal from 'sweetalert2'
import Header from "./Header";
const bu=process.env.REACT_APP_BASEURL
const Payment = () => {

	const navigate = useNavigate();
	const cookies = new Cookies();

	const [data,setuserdata,ref]=useState([]);
	const token = cookies.get("jwtoken");
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
     setuserdata(data)
     
     
      
    } catch (err) {
      navigate("/login");
      
     
      
    }
  };

  useEffect(() => {
    login();
    
  }, []);
	
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		
	} = useForm({
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	const handleOpenRazorpay = (data) => {

        const options = {
            key:'rzp_test_rGxHmaYvQD7bhS',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'Paws4You',
            description: 'Serving pets',
            handler: function (response) {
               
                axios.post(`${bu}/verify`, { response: response })
                    .then(res => {
                      
                        Swal.fire({
							title: 'Success!',
							text: 'Login Successful',
							icon: 'success',
							confirmButtonText: 'Success',
							timer: '2000'
							})
							navigate("/userhome");
                    })
                    .catch(err => {
                      
                    })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
		
    }

	   const onSubmit = (data) => {
		const {amount}=data;
        const _data = { amount: amount }
        axios.post(`${bu}/orders`, _data)
            .then(res => {
              
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
               
            })
    }


	return (
		<>
		{ref.current.usertype==="1"&&navigate("/login")}
			<Header/>
		
		<motion.section

			className="register"
			initial={{ width: 0 }}
			animate={{ width: "100%", transition: { duration: 0.5 } }}
			exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
		>
			<img src={SvgComponent} alt="" />
			
			<p>Help us save mankind</p>
			<form onSubmit={handleSubmit(onSubmit)}>


			<label htmlFor="amount">Enter Amount</label>
				<input
					id="amount"
					type="Number"
					{...register("amount", {
						required: "An amount is required",
						
					})}
					placeholder="0.0"
				/>
				{errors.amount && (
					<p className="error">
						{errors.amount.message }
					</p>
				)}

				<Button type="submit" children="Donate" />
				
			</form>
		</motion.section>
		</>
	);
};

export default Payment;
