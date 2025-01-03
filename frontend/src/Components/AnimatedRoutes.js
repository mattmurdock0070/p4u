import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from "../contexts/auth";

import Initial from './Initial';
import LoginForm from "./LoginForm.js";
import Home from "./Home.js";
import Message from "./Message.js";
import RegisterForm from "./RegisterForm.js";
import Footer from "./Footer";
import AdminHome from "./adminPages/AdminHome"
import Editanimal from "./adminPages/editanimal"
import Addanimal from "./adminPages/addanimal"
import Viewanimal from "./adminPages/viewanimal"
import Adminchat from "./adminPages/Adminchat"
import Querypage from "./querypage";
import Payment from "./payment";
import Responses from "./adminPages/responses"
import Userdetail from "./adminPages/getuserdetails.js"
import Userhome from "./Userhome.js";
import Chat from "./Chat.js"; // Import the Chat component

const AnimatedRoutes = () => {
  const location = useLocation();

  // Check if the current route is '/chat'
  const isChatRoute = location.pathname === '/chat'||location.pathname === '/Adminchat';

  return (
    <AnimatePresence exitBeforeEnter>
      <AuthProvider>
        <Routes location={location} key={location.pathname}>
          <Route exact path='/' element={<Initial />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/pets' element={<Home />} />
          <Route path='/editanimal' element={<Editanimal/>} />
          <Route path='/profile' element={<Message />} />
          <Route path='/adminhome' element={<AdminHome/>} />
          <Route path='/addanimal' element={<Addanimal/>} />
          <Route path='/viewanimal' element={<Viewanimal/>} />
          <Route path='/querypage' element={<Querypage/>} />
          <Route path='/responses' element={<Responses/>} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/getuserdetail' element={<Userdetail/>} />
          <Route path='/userhome' element={<Userhome/>} />
          <Route path='/chat' element={<Chat />} /> 
          <Route path='/Adminchat' element={<Adminchat />} /> 
        </Routes>
        {/* Render the footer only if the current route is not '/chat' */}
        {!isChatRoute && <Footer />}
      </AuthProvider>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
