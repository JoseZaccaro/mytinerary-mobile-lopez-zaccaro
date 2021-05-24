import React from 'react'
import NavBar from '../Components/NavBar'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';

const SignIn = (props)=>{


    return(
        <NavBar navigation={props.navigation} route={props.route}/>
    )
}

export default SignIn