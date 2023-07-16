import React, { useEffect, createContext } from 'react';
import useState from 'react-usestateref'
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {

	const navigate = useNavigate();
	const [ currentUser, setCurrentUser,reff ] = useState({
		name: null,
    email: null,

	});
	
	const cookies = new Cookies();
	const token = cookies.get("jwtoken");
	useEffect(() => {
		const checkLoggedIn = async () => {
			

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
				const em=data.email;
				const nam=data.name;
				setCurrentUser({

						name: nam,
                       email: em,
					});
				 
				  
				
			  } catch (err) {
				
				
				
			  }
		};

		checkLoggedIn();
	}, []);

	
	return (
		<UserContext.Provider value={{currentUser, setCurrentUser,reff}}>
			{ children}
		</UserContext.Provider>
	);
};


export default UserContext;