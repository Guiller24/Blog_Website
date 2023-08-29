import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useEffect, useState } from 'react';
import AuthenticateUser from "../api/js-api/AuthenticateUser";
import { useCustomNavigate } from "../navigation/CustomNavigate";

function Login({ isAuth, setIsAuth }) {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const { navToHome, navToCreateAccount } = useCustomNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await AuthenticateUser.authenticateUser(email, password);

            const token = response.data.token;
            localStorage.setItem("token", token);
            
            setIsAuth(true);
            navToHome();
        }catch(err){
            console.error(err);
        }
    };
    
    useEffect(() => {
        document.title = "Login";
        if(isAuth){
            navToHome();
        }
    });

    return (
       
        <div className='login-page'>        
        <form className="form" onSubmit={handleLogin}>
            <p className="form-title">Sign in to your account</p>
            <div className="input-container">
                <InputText className='p-inputtext-lg' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="input-container">
                <Password className='p-inputtext-lg' placeholder='Password...' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" class="submit">Sign in</button>
            <p className="signup-link">
                No account? 
                <a onClick={navToCreateAccount}>Sign up</a>
            </p>
            </form>
        </div>
    )
}

export default Login;