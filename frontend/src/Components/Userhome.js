
import { Link,useNavigate } from 'react-router-dom';
import useState from 'react-usestateref'
import {  useEffect} from 'react';
import { motion } from 'framer-motion';
import Header from "./Header";

import { Helmet } from 'react-helmet';
import SvgComponent from '../assets/logo-no-background3.png'
import Cookies from "universal-cookie";
const bu=process.env.REACT_APP_BASEURL
const Userhome = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [data,setuserdata,ref]=useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      setIsLoading(false)   
     
      
    } catch (err) {
      navigate("/login");
      
     
      
    }
  };

  useEffect(() => {
    login();
    
  }, []);
 
  return (
    <>
    {ref.current.usertype==="1"&&navigate("/login")}
   <Header/>
    <motion.section className='initial' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      <Helmet>
        <style>{"body { background-color: #3874ff; }"}</style>
      </Helmet>
      <img src={SvgComponent} alt="Logo AdoPet" />
      <h3>Welcome!</h3>
      <p>
       Adopting can change a life. How about picking up your new best friend today? Come with us!
      </p>
      <div className='home__buttons'>
        <Link className='button' to='/pets'>View Pets available</Link>
        <br>

        </br>
       
        <Link className='button' to='/payment'>Donate</Link>

        <br>

        </br>

        <Link className='button' to='/chat'>Connect with our team</Link>
        
      </div>
    </motion.section >
    </>
   
    
  );
};

export default Userhome;