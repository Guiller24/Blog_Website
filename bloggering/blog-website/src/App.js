import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, CreatePost, CreateAccount, EditPost } from "./components/pages/pages";
import PostViewPage from './components/pages/postViewPage';
import Navbar from "./components/common/Navbar";
import jwtDecode from 'jwt-decode';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";     
import 'primeicons/primeicons.css';                      
        

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token){
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if(!isTokenExpired){
        setIsAuth(true);
      }
    };
  });
  
  return (
   <Router>
    <Navbar isAuth={isAuth}  setIsAuth={setIsAuth}/>
    <Routes>
      <Route path="/" element={<Home isAuth={isAuth}/>} />
      <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
      <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>} />
      <Route path='/createaccount' element={<CreateAccount />} />
      <Route path="/viewPost/:postId" element={<PostViewPage isAuth={isAuth}/>}/>
      <Route path="/EditPost/:postId" element={<EditPost isAuth={isAuth}/>}/>
    </Routes>
   </Router>

  );
}

export default App;