import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import userService from '../api/js-api/userService';
import { useCustomNavigate } from '../navigation/CustomNavigate';
import '../styles/create-account.css';
export const CreateAccount = () => {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ contactNum, setContactNum ] = useState("");
    const [ address, setAddress] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirm, setConfirm ] = useState("");
    const toast = useRef("");

    useEffect(() => {
        document.title = "Create new Account"
    });
    const { navToLogin } = useCustomNavigate();
    
    const createUser = async (event) =>{
        
        event.preventDefault();
        const userInfo = {
            firstName,
            lastName,
            email,
            contactNum,
            address,
            password,
        };

        try{
            const response = await userService.createUser(userInfo);
            console.log(response);
            alert("User Successfuly Created", response.data);
            setFirstName("");
            setLastName("");
            setEmail("");
            setContactNum("");
            setAddress("");
            setPassword("");
            setConfirm("");
            toast.current.show({ severity: 'success', summary: 'Sucess', detail: 'User Created Successfully', life: 3000 });
            navToLogin();
        }catch(err){
            console.error(err);
        }
    }

  return (
    <div className='createAccountContainer'>
        <Toast ref={toast} position="top-right" />
        <form className="form" onSubmit={createUser}>
            <p className="form-title">Create a new account</p>
            <div className="input-container">
                <InputText className='p-inputtext-lg' placeholder='First Name...' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="input-container">
                <InputText className='p-inputtext-lg' placeholder='Last Name...' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="input-container">
                <InputText className='p-inputtext-lg' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-container">
                <InputText className='p-inputtext-lg' placeholder='Contact Number' value={contactNum} onChange={(e) => setContactNum(e.target.value)} />
            </div>
            <div className="input-container">
                <InputText className='p-inputtext-lg' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="input-container">
                <Password className='p-inputtext-lg' placeholder='Password...' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-container">
                <Password className='p-inputtext-lg' placeholder='Confirm password...' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <button type="submit" class="submit">Sign up</button>
            <p className="signup-link">
                Already have an account? 
                <a onClick={navToLogin}>Sign in</a>
            </p>
            </form>
    </div>

  )
}

export default CreateAccount;