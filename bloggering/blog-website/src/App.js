import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { CreateAccount, CreatePost, EditPost, Home, Login } from "./components/pages/pages";
import PostViewPage from './components/pages/postViewPage';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import './components/styles/create-account.css';
import './components/styles/home.css';
import './components/styles/login.css';
import './components/styles/nav.css';
import './components/styles/view-page.css';
import './components/styles/create-post.css';
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