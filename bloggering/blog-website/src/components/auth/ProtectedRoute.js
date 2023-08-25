import React from "react";
import { Navigate, Route } from "react-router-dom";
import { CreatePost } from "../pages/pages";

const ProtectedRoute = ({ isAuth }) =>{
    
    return isAuth ? <CreatePost isAuth={isAuth} /> : <Navigate to="/login" />;
}

export default ProtectedRoute;

