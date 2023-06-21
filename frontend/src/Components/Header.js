// dependencies
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import Cookies from "universal-cookie";
import loggedUser from '../assets/usernew.png';
import Button from './Button';

import SvgComponent from '../assets/logo-no-background1.png'
import Spinner from "./Spinner"
const Header = () => {
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const [data, setdata] = useState({
    image:loggedUser,
  });
const[page,setpage]=useState("/userhome")





  const cookies = new Cookies();
  const token = cookies.get("jwtoken");
  const[auth,setauth]=useState(false)

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
      const dataa = await res.json();
      console.log("dataa");
      console.log(data);
      setdata(dataa);
      setIsLoading(false)   
      if(dataa.usertype === '1')
      setpage("/adminhome")
     
      
    } catch (err) {
     
      
     
    }
  };

  const handlelogout = () => {
   
    cookies.remove("jwtoken", { path: "/" });
        navigate("/login");
       
  };


     

  useEffect(() => {
    login();
    
  }, []);




  

  return (
    <>
    {(isLoading&&(location.pathname === '/querypage'||data.usertype === '1'||location.pathname === '/perfil' || location.pathname === '/payment'|| location.pathname === '/userhome' || location.pathname === '/home')&&<Spinner/>)||
    <header className='header'>
      <nav>
        <div>
          <img className='header__logo' src={SvgComponent} alt="" aria-hidden='true' />
          <Link className='header__home' aria-label='Tela inicial' to={page} ></Link>
         
        </div>
        {(location.pathname === '/querypage'||data.usertype === '1'||location.pathname === '/perfil'||location.pathname === '/userhome' || location.pathname === '/home')&& 
        
        <Menu>
          <Menu.Button className="menu__button">
            <img className='header__user' src={data.image||loggedUser} alt="Usuário" />
          </Menu.Button>
          <Menu.Items className='menu__content'>
            <a className='button' href="/perfil">View Profile</a>
            <Button handleClick={handlelogout} children="Logout"></Button>
          </Menu.Items>
        </Menu>
        
        
        
        }
      </nav>
    </header>}
    </>
  );
};

export default Header;