import React, { useRef, useState } from 'react'
import NavBar from '../Components/NavBar'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import {View,StyleSheet, ScrollView, Text, ImageBackground, Image, TouchableHighlight, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import authActions from '../redux/actions/authActions'
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';


const SignIn = (props)=>{
    
    const [state, setState] = useState({
        email:"",
        password:"",
    })
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [value, setValue ] = useState("")
    const inputValues = (e, name)=>{
        setState({
            ...state,
            [name]:e
        })
    }
    const submit = async ()=>{
      const errores = await props.signIn(state)
        console.log(errores)
        if(errores){
            Toast.show({
                  type: 'error',
                  text1: errores.errores[0],
                  visibilityTime: 3000,
                  autoHide: true,
                  })
        }else{
            props.navigation.navigate('cities')
        }
      
    }


    return(
        <View style={styles.contenedor}>
            <NavBar navigation={props.navigation} route={props.route}/>
                <View style={styles.main}>
                   <View style={styles.input}>
                    <FloatingLabelInput
                        label="Enter your email"
                        value={state.email}
                        keyboardType="email-address"
                        onChangeText={(e)=>inputValues(e, "email")}
                        containerStyles={{
                            paddingHorizontal: 10,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            height:hp('10%'),
                            alignSelf:'center',
                        }}
                          customLabelStyles={{
                            fontSizeFocused:wp('4%'), 
                            fontSizeBlurred:wp('5%'),
                            colorFocused: 'black',
                            colorBlurred:'black',
                          }}
                          labelStyles={{
                            backgroundColor: 'transparent',
                            paddingHorizontal: 5,
                          }}
                          inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                            fontSize:wp('6%'),
                            paddingTop:wp('2.5%')
                        }}
                        />
                    </View>
                    <View style={styles.input}>
                        <FloatingLabelInput
                            label="Enter your password"
                            value={state.password}
                            isPassword={true}
                            darkTheme={true}
                            onChangeText={(e)=>inputValues(e, "password")}
                            containerStyles={{
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                height:hp('10%'),
                                alignSelf:'center',
                            }}
                            customLabelStyles={{
                                fontSizeFocused:wp('4%'), 
                                fontSizeBlurred:wp('5%'),
                                colorFocused: 'black',
                                colorBlurred:'black',
                            }}
                            labelStyles={{
                                backgroundColor: 'transparent',
                                paddingHorizontal: 5,
                            }}
                            inputStyles={{
                                color: 'black',
                                paddingHorizontal: 10,
                                fontSize:wp('6%'),
                                paddingTop:wp('2.5%')
                            }}
                        />
                    </View>
                </View>
                <TouchableHighlight  underlayColor="#rgba(0,0,0,0.5)" style={styles.getStartedSign} onPress={submit}>
                    <Text style={[styles.getStartedTextSign, styles.signUpSign]}> Sign In</Text>
                    </TouchableHighlight>
            <Text style={styles.textHaveAcc}>You don't have an account?</Text>
            <TouchableHighlight  underlayColor="#rgba(0,0,0,0.5)" style={styles.getStarted} onPress={()=> props.navigation.navigate('signup')}>
                {/* <LinearGradient start={{x:0,y:0}} end={{x:0.8,y:0.8}}   colors={['#rgba(255,255,255,1)', '#rgba(255,255,255,0.5)']}> */}
                    <Text style={[styles.getStartedText, styles.signUp]}> Sign Up!</Text>
                {/* </LinearGradient> */}
            </TouchableHighlight>
            
        </View>
        )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#2dabfe',
        width:wp('100%'),
        height:hp('100%'),

    },    
    main:{
        width:wp('100%'),
        height:hp('50%'),
        justifyContent:'center'
        // paddingTop:hp('4%')
        // backgroundColor:'red'
    },
    getStarted:{
        borderStyle:'solid',
        borderRadius:200,
        overflow:'hidden',
        width:wp('50%'),
        alignSelf:'center',
        justifyContent:'center',
    },
    getStartedText:{
        color:'yellow',
        textAlign:'center',
        paddingVertical:5,
        fontWeight:'bold',
    },
    signUp:{
        fontSize:wp('7.5%'),
        height:hp('7.5%'),
        justifyContent:'center'
    },
    input:{
        width:wp('85%'),
        height:hp('10%'),
        alignSelf:'center',
        marginBottom:hp('10%'),
    },
    textHaveAcc:{
        alignSelf:'center',
        fontSize:wp('5%'),
        fontWeight:'bold',
        marginTop:hp('20%')
    },
    getStartedSign:{
        // marginVertical:25,
        borderStyle:'solid',
        borderRadius:200,
        overflow:'hidden',
        borderWidth:2,
        width:wp('50%'),
        alignSelf:'center',
        justifyContent:'center',
        marginTop:hp('-5%')

    },
    getStartedTextSign:{
        color:'white',
        textAlign:'center',
        paddingVertical:7.5,
        fontWeight:'bold'
    },
    signUpSign:{
        fontSize:wp('7.5%'),
        height:hp('7.5%'),
        justifyContent:'center'
    },
})

const mapStateToProps = state => {
    return{
        user: state.authReducer.user
    }
}
const mapDispatchToProps = {
    signIn: authActions.signIn,
}


export default  connect(mapStateToProps, mapDispatchToProps)(SignIn);