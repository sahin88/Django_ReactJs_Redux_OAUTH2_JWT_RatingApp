import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { facebookAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Facebook = ({ facebookAuthenticate }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            facebookAuthenticate(state, code);
        }
    }, [location]);

    return (
        <div className='container'>
           
                <h1 class='display-4'>Welcome to Auth System!</h1>
                <p class='lead'>This is an incredible authentication system with production level features!</p>
                <hr class='my-4' />
              
    
        </div>
    );
};

export default connect(null, { facebookAuthenticate })(Facebook);