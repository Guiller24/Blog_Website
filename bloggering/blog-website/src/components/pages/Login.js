import React, { useEffect, useState } from 'react';
import AuthenticateUser from "../api/js-api/AuthenticateUser";
import { useCustomNavigate } from "../navigation/CustomNavigate";
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
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
            <div className="login-container">
                <Card title='Login' >
                <div className="emailLoginContainer">
                    <form className="loginForm">
                        <label htmlFor="email">Email:</label>
                        <InputText id='email' className='p-inputtext-lg' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password:</label>
                        <Password id='password' className='p-inputtext-lg' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button label="Log in" severity="secondary" outlined onClick={handleLogin}/>
                    </form>
                </div>
                <Divider className='divider' />
                <div className="googleContainer">
                    <Button label='Create New Account' severity='secondary' text onClick={navToCreateAccount} />
                </div>
                </Card>
            </div>
        </div>
    )
}

export default Login;