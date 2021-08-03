import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
            
        }
       
    }, [location]);

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin">
                <div className="form-bottom">
                        <Link className="p-tag" to='login'>Login</Link>
                        </div>
                </div>
    
            </div>
            <div className="right-panel">
            </div>
    
        </div>
    );
};

export default connect(null, { googleAuthenticate })(Google);