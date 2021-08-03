
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Protected = ({ component: Component,isAuthenticated:isAuthenticated, ...rest }) => {
    console.log("error",isAuthenticated, rest);
   
    return<Route
        {...rest}
        render={props => {
            if(!isAuthenticated)
             {return<Redirect to='/login/true' />}
             else{
                return<Component {...props} />
            }
             } }/>
};


const mapStateToProps = state => {
    console.log("state", state)

    return{
    isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps, null)(Protected);