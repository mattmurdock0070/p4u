import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from "./Header";

import { Helmet } from 'react-helmet';
import SvgComponent from '../assets/logo-no-background3.png'
import useMediaQuery from '../hooks/useMediaQuery';

const Home = () => {
  const matches = useMediaQuery('(max-width: 767px)');

  return (
    <>
    <Header/>
    <motion.section className='initial' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      <Helmet>
        <style>{"body { background-color: #3874ff; }"}</style>
      </Helmet>
      <img src={ SvgComponent } alt="Logo " />
      <h3>Welcome!</h3>
      <p>
        Adopting can change a life. How about picking up your new best friend today? Come with us!
      </p>
      <div className='home__buttons'>
        <Link className='button' to='/login'><b>Login</b></Link>
        <br></br>
        <Link className='button' to='/register'><b>Register</b></Link>
       
      </div>
    </motion.section >
    </>
  );
};

export default Home;