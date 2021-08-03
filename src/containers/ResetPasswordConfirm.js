import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import {reset_password_confirm} from "../actions/auth";
import { FaUnlockAlt} from 'react-icons/fa';
const ResetPasswordConfirm =({ match, reset_password_confirm })=>{
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData]= useState({new_password:'',re_new_password:''});

    const {new_password, re_new_password}=formData;
    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit= e =>{
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);

     
  

    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return(   <div className="container">
    <div className="forms-container">
        <div className="signin">
            <form onSubmit={e=>onSubmit(e)} className="signin-form">
                <h2 className="title">Sign in</h2>
                <p className="p-tag">Sign in with social platforms</p>
            
                <div className="input-field">
                    <FaUnlockAlt className="form-icons"/>
                    <input type="text" name="new_password" value={new_password}  onChange={(e)=>onChange(e)} minLength='6' placeholder="Enter your  new password"/>


                </div>
                <div className="input-field">
                    <FaUnlockAlt className="form-icons"/>
                    <input type="text"  name="re_new_password" onChange={(e)=>onChange(e)} value={re_new_password }  placeholder="Reenter your Password"/>
                </div>

                <input type="submit" value="Login" className="btn solid"/>
               
               
                <div className="form-bottom">
           
                <Link className="p-tag" to='login'>Reset Password</Link>
                </div>
             
            </form>

        </div>

    </div>
    <div className="right-panel">
    </div>

</div>
)


}
   

export default connect(null,{reset_password_confirm})(ResetPasswordConfirm) ;