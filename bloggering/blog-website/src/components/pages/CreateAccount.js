import React, { useEffect, useState, useRef } from 'react';
import { useCustomNavigate } from '../navigation/CustomNavigate';
import userService from '../api/js-api/userService';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
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
        <form className="createAccountForm" onSubmit={createUser}>
            <Card title="Create Account" className='createNewAccount'>
            <label htmlFor="firstname">First Name:</label>
            <InputText value={firstName} id='firstname' placeholder="First Name..." onChange={(e) => {setFirstName(e.target.value)}} required/>
            <label htmlFor="lastName">Last Name:</label>
            <InputText value={lastName} id='lastname' placeholder="Last Name..." onChange={(e) => {setLastName(e.target.value)}}  required/>
            <label htmlFor="email">Email:</label>
            <InputText value={email} id='email' placeholder="sample@example.com..." onChange={(e) => {setEmail(e.target.value)}} required/> 
            <label htmlFor="contactNum">Contact Number:</label>
            <InputText value={contactNum} id='contactNum' placeholder="09xxxxxxxxx..." onChange={(e) => {setContactNum(e.target.value)}} required/>
            <label htmlFor="address">Adress:</label>
            <InputText value={address} id='address' placeholder="Street, Municipality, Province..." onChange={(e) => {setAddress(e.target.value)}} required/>
            <label htmlFor="password">Password:</label>
            <Password value={password} id='password' placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}} required/>
            <label htmlFor="confirm">Confirm Password:</label>
            <Password value={confirm} id='confirm' styleClass='w-full' placeholder="Confirm Password..." onChange={(e) => {setConfirm(e.target.value)}} required/>
            <div className='submitcontainer'>
            <Button type="submit" label="Submit" severity="secondary" />
            </div>
            </Card>
        </form>
    </div>

  )
}

export default CreateAccount;