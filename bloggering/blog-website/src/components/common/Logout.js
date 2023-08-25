import React from 'react';
import { useCustomNavigate } from '../navigation/CustomNavigate';

const Logout = ({ setIsAuth }) => {
    const {navToLogin} = useCustomNavigate();

    const logout = () => {
        try{
            localStorage.clear();
            setIsAuth(false);
            navToLogin();
        }catch(err){
        console.error(err);
        }
    }
    return (
        <button onClick={logout} className="logout">Logout</button>
    )
}

export default Logout;