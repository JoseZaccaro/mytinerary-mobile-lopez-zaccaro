import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorDrawer from './navigation/NavigatorDrawer';
import { StatusBar } from 'react-native';
import {connect} from 'react-redux'
import authActions from './redux/actions/authActions';
import Loader from "react-loader";
const App2 = (props) => {
  return (
      <NavigationContainer>
        <StatusBar/>
        <NavigatorDrawer/>
      </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return{
    user: state.authReducer.user,
    token: state.authReducer.token
  }
}

const mapDispatchToProps = {
  signInLS: authActions.signInLS
}

export default connect(mapStateToProps,mapDispatchToProps)(App2)
// getIsDrawerOpenState