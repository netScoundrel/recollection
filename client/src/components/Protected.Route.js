import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from '../Auth';


export const ProtectedRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={(props) => (
            Auth.isAuthenticated() === true
            ? <Component {...props} username={rest.username} userId={rest.userId} />
            : <Redirect to="/" />
        )} />
)


