import React, { useEffect, useState } from 'react'
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import isAuth from 'helper/isAuth';
import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const App = ({ userAuth }) => {
    const [authenticate, setAuthenticate] = useState(false)

    useEffect(() => {
        setAuthenticate(isAuth());
    }, [userAuth]);

    return (
        <HashRouter>
            <Toaster position="bottom-center" reverseOrder={false} />
            {authenticate ? (
                <Switch>
                    <Route exact path="/admin/dashboard" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/pharmacies" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/medicaments" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/localities" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/configuration" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/logout" render={(props) => <AdminLayout {...props} />} />

                    <Redirect from='/' to='/admin/dashboard' />
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/auth/login" render={(props) => <AuthLayout {...props} />} />
                    <Redirect to="/auth/login" />
                </Switch>
            )}
        </HashRouter>
    )
}

const mapStateToProps = ({ LoginReducer }) => ({
    userAuth: LoginReducer.userAuth,
    loading: LoginReducer.loading,
    error: LoginReducer.error,
});

export default connect(mapStateToProps)(App);
