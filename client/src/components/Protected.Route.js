import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from '../Auth';



export const ProtectedRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={(props) => (
            Auth.authenticated === true
            ? <Component {...props} />
            : <Redirect to="/" />
        )} />
)
