import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from '../Auth';


export const ProtectedRoute = ({component: Component, ...rest}) => (
        console.log('Authenticated: ' + Auth.authenticated),
        <Route {...rest} render={(props) => (
            Auth.isAuthenticated() === true
            ? <Component {...props} />
            : null
        )} />
)




