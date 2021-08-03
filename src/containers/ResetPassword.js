import React,{ useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { FaGoogle} from 'react-icons/fa';
import { FaFacebookF} from 'react-icons/fa';
import {Link, Redirect} from 'react-router-dom';
import {reset_password} from '../actions/auth'

const ResetPassword =({reset_password})=>{
    const [formData, setFormData]= useState({email:''});
    const [sentRequest,setsentRequest ]= useState(false);


    const {email}=formData;
    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit= e =>{
        e.preventDefault();
        reset_password(email);

        console.log("email",email
        )
        
     
        setsentRequest(true)

    };
    if (sentRequest){
        <Redirect to='/'/>

    }
    return (
        <div className="container">
        <div className="forms-container">
            <div className="signin">
                <form className="signin-form" onSubmit={(e)=>onSubmit(e)}>
                    <h2 className="title">Reset Password</h2>
                    <div className="input-field">
                        <FaUserAlt className="form-icons"/>
                        <input type="email"  name="email" value={email} onChange={(e)=>onChange(e)} placeholder="Enter your Email"/>
                    </div>
                   
                  

                    <input type="submit"  value="Reset Email" className="btn solid"/>
                

                </form>

            </div>

        </div>
        <div className="right-panel">
        </div>

    </div>
    );};    


export default connect(null,{reset_password})(ResetPassword);