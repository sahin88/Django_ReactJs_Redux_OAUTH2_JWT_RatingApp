import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { FaUnlockAlt} from 'react-icons/fa';
import { FaGoogle} from 'react-icons/fa';
import { FaFacebookF} from 'react-icons/fa';
import {login} from "../actions/auth";
import  '../css/login.css'
import axios from 'axios';

const Login  = ({ login, isAuthenticated, match }) =>{
    const [formData, setFormData]= useState({email:'',password:''});


    const {email, password}=formData;
    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit= e =>{
    try {
        login(email, password);
        
    } catch (error) {
        alert(alert)
        
    }
    console.log("signal has been detected")
    e.preventDefault();

    };
    if(match.params.value){
        alert("Bitte login Sie sich, um Ihre Komennetar zu verfassen")
    }

    const continueWithGoogle = async (e) => {

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)
         
            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };
    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {
            

        }
    };

   

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    
    

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin">
                <div className="social-media">
                   
                        <button type="submit" onClick={ (e)=>(continueWithGoogle(e)) }className="btn solid google-btn"> <FaGoogle/> Continue with Google</button>
                    
                         <button type="submit" onClick={continueWithFacebook }className="btn solid facebook-btn">  <FaFacebookF/> Continue with Facebook</button>
                 
                            
                           
                        </div>
                    <form onSubmit={e=>onSubmit(e)} className="signin-form">
                        <h2 className="title">Sign in</h2>
                        <p className="p-tag">Sign in with social platforms</p>
                      
                        <div className="input-field">
                            <FaUserAlt className="form-icons"/>
                            <input type="email" name="email" value={email}  onChange={(e)=>onChange(e)} minLength='6' placeholder="Enter your Email"/>
    
    
                        </div>
                        <div className="input-field">
                            <FaUnlockAlt className="form-icons"/>
                            <input type="password"  name="password" onChange={(e)=>onChange(e)} value={password}  placeholder="Enter your Password"/>
                        </div>
    
                        <input type="submit" value="Login" className="btn solid"/>
                       
                       
                        <div className="form-bottom">
                   
                        <Link className="p-tag" to='signup'>Don't have any account ?</Link>
                        </div>
                        <div className="form-bottom">
                        <Link className="p-tag" to='reset-password'>Forgot your Password?</Link>
                        </div>
                    </form>
    
                </div>
    
            </div>
            <div className="right-panel">
            </div>
    
        </div>
        
    )
     
    

};

 const mapStateToProps=state=>({
     isAuthenticated: state.auth.isAuthenticated
 });

export default connect(mapStateToProps,{login})(Login);