// dependencies
import { Link,useNavigate } from 'react-router-dom';
import {  useState ,useEffect} from 'react';
import { motion } from 'framer-motion';
import Header from "./Header";
// hooks and dependencies
import { Helmet } from 'react-helmet';
import useMediaQuery from '../hooks/useMediaQuery';
import SvgComponent from '../assets/logo-no-background3.png'
import Spinner from "./Spinner"
import Cookies from "universal-cookie";
const Userhome = () => {
  const matches = useMediaQuery('(max-width: 767px)');
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false)   
     
      
    } catch (err) {
      navigate("/login");
      
     // console.log(err);
      
    }
  };

  useEffect(() => {
    login();
    
  }, []);
 
  return (
    <>
  
   <Header/>
    <motion.section className='initial' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      <Helmet>
        <style>{"body { background-color: #3874ff; }"}</style>
      </Helmet>
      <img src={SvgComponent} alt="Logo AdoPet" />
      <h3>Welcome!</h3>
      <p>
        {matches ? 'Que tal mudar sua vida adotando seu novo melhor amigo? Vem com a gente!' : 'Adopting can change a life. How about picking up your new best friend today? Come with us!'}
      </p>
      <div className='home__buttons'>
        <Link className='button' to='/home'>View Pets available</Link>
        <br>

        </br>
        <br/>
        <Link className='button' to='/payment'>Donate</Link>
        
      </div>
    </motion.section >
    </>
   
    
  );
};

export default Userhome;