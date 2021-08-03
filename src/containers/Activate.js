import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {verify} from '../actions/auth'
const Activate =({match, verify})=>{
    const [verified, setVerified] = useState(false);
    const onSubmit= e =>{
        
        const uid= match.params.uid
        const token= match.params.token
      
     
        e.preventDefault();
        verify(uid, token);
        setVerified(true)

    };
    if (verified) {
        return <Redirect to='/login' />
    }
    

    return(
        <div className="container">
        <div className="forms-container">
            <div className="signin">
                <form onSubmit={e=>onSubmit(e)} className="signin-form">
                   
                    <input type="submit" value="Activate" className="btn solid"/>
                   
        
                </form>

            </div>

        </div>
        <div className="right-panel">
        </div>

    </div>
    )



}
   


export default connect (null,{verify}) (Activate);