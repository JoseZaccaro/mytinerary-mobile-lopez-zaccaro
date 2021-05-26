import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorDrawer from './navigation/NavigatorDrawer';
import { ActivityIndicator, StatusBar } from 'react-native';
import {connect} from 'react-redux'
import authActions from './redux/actions/authActions';
import Loader from "react-loader";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const App2 = (props) => {

      if(!props.user){
        const signLs = async ()=>{
        let token = await AsyncStorage.getItem('token')
        if(!props.user && token){
          await props.signInLS()
          return(true)
        }
        return(false)
      }
      const loading = signLs()
      if(loading){
        return <ActivityIndicator color="red" size={100} style={{marginTop:hp('30%')}}/>
      }
      }
  return (
      <NavigationContainer>
        <StatusBar/>
        <NavigatorDrawer/>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return{
    user: state.authReducer.user,
  }
}

const mapDispatchToProps = {
  signInLS: authActions.signInLS
}

export default connect(mapStateToProps,mapDispatchToProps)(App2)
// getIsDrawerOpenState