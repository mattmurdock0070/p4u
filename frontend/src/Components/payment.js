
import { motion } from "framer-motion";

import { useForm,useController  } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SvgComponent from '../assets/logo-no-background.png'

import Button from "./Button.js";
import axios from "axios";
import Swal from 'sweetalert2'
import Header from "./Header";
const Payment = () => {

	const navigate = useNavigate();

	
	
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
                console.log(response, "34")
                axios.post('http://localhost:5000/verify', { response: response })
                    .then(res => {
                        console.log(res, "37")
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
                        console.log(err)
                    })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
		
    }

	   const onSubmit = (data) => {
		const {amount}=data;
        const _data = { amount: amount }
        axios.post('http://localhost:5000/orders', _data)
            .then(res => {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


	return (
		<>
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
						required: "É necessário informar um endereço de email",
						
					})}
					placeholder="0.0"
				/>
				{errors.amount && (
					<p className="error">
						{errors.amount.message || "Por favor, verifique o email digitado"}
					</p>
				)}

				<Button type="submit" children="Donate" />
				
			</form>
		</motion.section>
		</>
	);
};

export default Payment;
