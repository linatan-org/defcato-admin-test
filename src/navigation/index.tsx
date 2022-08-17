import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { SignIn } from '../pages/SignIn/SignIn';

const yourModuleName = require('@elastic/apm-rum-react');
const { ApmRoute } = yourModuleName;

const appRoutes = () => {
    return (
        <Switch>
            <ApmRoute path="/signIn" component={ SignIn } />
            <Redirect exact from="/" to="/dashboard" />
        </Switch>
    )
};

export default appRoutes;
