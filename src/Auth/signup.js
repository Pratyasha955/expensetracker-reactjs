import React, {useState} from "react";
import { Link } from "react-router-dom";
import './signup.css';

const Signup = () => {
const[formData,setFormData]=useState({
    email:'',
    password:'',
    confirmPassword:'',
});
const[error,setError]=useState(null);
const handelChange =(e) =>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
};
const handleSubmit=async (e)=>{
    e.preventDefault();

    if(!formData.email || !formData.password || !formData.confirmPassword){
        setError("all fields are mandatroy");
        return;
        
    }
    if(formData.password !== formData.confirmPassword){
        setError("password do not match");
        return;
    }
    try{
        const response=await fetch
        ( 
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0',
            {
                method:'POST',
                headers:{
                   'Content-type':'application/json',
                },
                body:JSON.stringify({
                    email:formData.email,
                    password:formData.password,
                    returnSecureToken:true,
                }),

            }
        );
        const data=await response.json();
        if(response.ok){
            console.log('user successfully signup');
            setError(null);
            setFormData({
                email:'',
                password:'',
                confirmPassword:'',

            });

            
        }
        else{
            setError(data.error.message);
        }

    }
    catch(error){
        setError('an error accure during signup');
    }
};

    return (
        <div className="Signup-container">
            <h2> Signup</h2>
            <form onSubmit={handleSubmit}>
                <label> Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handelChange} />

                <label>Password:</label>
                <input type="password" name="password" value={formData.password}onChange={handelChange} />
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handelChange}/>
                <button type="submit">Signup</button>
            </form>
            {error && <p className="error-message">{error}</p>} 
            <p className="Login-Message">
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default Signup; 