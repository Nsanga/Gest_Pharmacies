import React, { useEffect, useState } from 'react'
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
// import isAuth from 'helper/isAuth';
// import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const App = ({userAuth}) => {
    // const[authenticate, setAuthenticate] = useState(false)

    // useEffect(() => {
    //     setAuthenticate(isAuth());
    // }, [userAuth]);

    return ( 
        <HashRouter>
            <Toaster position="bottom-center" reverseOrder={false} />
            {/* {authenticate ? ( */}
                <Switch>
                    <Route exact path="/admin/dashboard" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/pharmacies" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/medicaments" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/localités" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/configuration" render={(props) => <AdminLayout {...props} />} />

                    <Redirect from='/' to='/admin/dashboard' />
                </Switch>
            {/* ) : ( */}
                {/* <Switch>
                    <Route exact path="/auth/login" render={(props) => <AuthLayout {...props} />} />
                    <Redirect to="/auth/login" />
                </Switch> */}
            {/* )} */}
        </HashRouter>
    )
}

// const mapStateToProps = ({ DashboardReducer }) => ({
//     userAuth: DashboardReducer.userAuth,
//     loading: DashboardReducer.loading,
//     error: DashboardReducer.error,
//   });
  
  export default App;
