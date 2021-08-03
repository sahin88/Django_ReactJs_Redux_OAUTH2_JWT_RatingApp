import React,{ useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { FaUnlockAlt} from 'react-icons/fa';
import { FaGoogle} from 'react-icons/fa';
import { FaFacebookF} from 'react-icons/fa';
import {signup} from '../actions/auth';
import { connect } from 'react-redux';
import  axios from 'axios'
const Signup =({signup,isAuthenticated})=>{
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData]= useState({email:'',password:'',first_name:'',last_name:'',re_password:''});

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const {first_name,last_name,email,  username, password, re_password}=formData;
  
 
    const onSubmit= e =>{
    
     
        e.preventDefault();
        if (password === re_password) {
            signup(first_name,last_name, email, password, re_password);
            setAccountCreated(true);
        }
        <Redirect to='/login'/>

    };

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
    if (accountCreated) {
        return <Redirect to='/login' />
    }
  

    return (
    
        <div className="container">
            
           
        <div className="forms-container">
       
                    <div className="social-media">
                    <p className="social-text">Or Sign in with social platforms</p>
                   
                    <button type="submit" onClick={ (e)=>(continueWithGoogle(e)) }className="btn solid google-btn"> <FaGoogle/> Continue with Google</button>
                
                     <button type="submit" onClick={continueWithFacebook }className="btn solid facebook-btn">  <FaFacebookF/> Continue with Facebook</button>
    
                   </div>
            <div className="signin">
                <form className="signin-form" onSubmit={(e)=>onSubmit(e)} >
                    <h2 className="title">Sign Up</h2>
                  
                    <div className="input-field">
                        <FaUserAlt className="form-icons"/>
                        <input type="email" name="email" value={email} onChange={(e)=>onChange(e)} placeholder="Enter your Email"/>
                    </div>
                    <div className="input-field">
                        <FaUnlockAlt className="form-icons"/>
                        <input type="text" name="first_name" value={first_name}  onChange={(e)=>onChange(e)} placeholder="Enter your  First Name"/>
                    </div>
                    <div className="input-field">
                        <FaUnlockAlt className="form-icons"/>
                        <input type="text" name="last_name" value={last_name}  onChange={(e)=>onChange(e)} placeholder="Enter your  Last Name"/>
                    </div>

                    <div className="input-field">
                        <FaUnlockAlt className="form-icons"/>
                        <input type="text" name="password" value={password} onChange={(e)=>onChange(e)} placeholder="Enter your Password"/>
                    </div>
                    
                    <div className="input-field">
                        <FaUnlockAlt className="form-icons"/>
                        <input type="text" name="re_password" value={re_password} onChange={(e)=>onChange(e)} placeholder="Reenter your Password"/>
                    </div>
                  

                    <input type="submit" value="Sign Up" className="btn solid"/>

               

                </form>

            </div>

        </div>
        <div className="right-panel">
        </div>

    </div>
    );    


};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps, {signup} )(Signup);