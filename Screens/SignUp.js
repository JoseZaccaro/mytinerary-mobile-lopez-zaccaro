import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import {View,StyleSheet, ScrollView, Text, ImageBackground, Image, TouchableHighlight, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
  import { LinearGradient } from 'expo-linear-gradient';
  import { TextInput } from 'react-native-gesture-handler';
  import { FloatingLabelInput } from 'react-native-floating-label-input';
  import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import authActions from '../redux/actions/authActions'
import Toast from 'react-native-toast-message';


const SignUp = (props)=>{

    const [state, setState] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        image:"",
        country:"",
    })
    const [passwordDone, setPasswordDone] = useState(null)
    const [emailDone, setEmailDone] = useState(null)
    const [firstNameDone, setFirstNameDone] = useState(null)
    const [lastNameDone, setLastNameDone] = useState(null)
    const [urlDone, setUrlDone] = useState(null)
    const [countryDone, setCountryDone] = useState(null)
    const inputValues = (e, name)=>{
        setState({
            ...state,
            [name]:e
        })
    }

    const patterns = {
        firstName:/[a-zA-Z]{3,12}$/g,
        lastName:/[a-zA-Z]{3,12}$/g,
        url:/[!-~]{8,}/g,
        // eslint-disable-next-line
        email:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g,
        // eslint-disable-next-line
        password:/^[0-9]*[A-Za-z0-9]+[0-9]+$/g
    }
    
    useEffect(() => {
        props.navigation.addListener('blur', ()=>{
            setState({
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                image:"",
                country:"",
            })
            setPasswordDone(null)
            setEmailDone(null)
            setFirstNameDone(null)
            setLastNameDone(null)
            setUrlDone(null)
            setCountryDone(null)

        })
        return () => {
        props.navigation.removeListener('blur')
    }
    }, [])

    const submit = async (e) =>{
        console.log(props.user)
            patterns.email.test(state.email) ? setEmailDone(true) : setEmailDone(false) 
            patterns.password.test(state.password) ? setPasswordDone(true) : setPasswordDone(false) 
            patterns.firstName.test(state.firstName) ? setFirstNameDone(true) : setFirstNameDone(false) 
            patterns.lastName.test(state.lastName) ? setLastNameDone(true) : setLastNameDone(false) 
        console.log("hice Submit")
        const errores = {...await props.signUp(state)}

        if(errores.errores){
            // console.log(errores)
            errores.errores.length > 1 ?
                Toast.show({
                    type: 'error',
                    text1: errores.errores[0].message,
                    text2:  "📢at field: " + errores.errores[0].context.label,
                    visibilityTime: 3000,
                    autoHide: true,
                })
                :
                Toast.show({
                    type: 'error',
                    text2: errores.errores[0],
                    visibilityTime: 3000,
                    autoHide: true,
                })
        }else{
            props.navigation.navigate('cities')
        }
    // }
        // }
        // else{
            // ERRORES DE VALIDACION EN SIGN UP
            // this.setState({required:true})
            // errores = {...await this.props.signUp(this.state[this.form])}
        // }
        // if(errores.errores){
        // }   
    }
    const [createAccount, setCreateAccount] = useState(false)
    return(
        <ScrollView style={styles.contenedor}>
            <NavBar navigation={props.navigation} route={props.route} signUpping={createAccount} setCreateAccount={setCreateAccount}/>
            {createAccount 
            ?<>
               <ScrollView style={styles.main}>    
                    <View style={styles.input}>
                        <FloatingLabelInput
                            label="Enter your first name"
                            value={state.firstName}
                            onChangeText={(e)=>inputValues(e, "firstName")}
                            leftComponent={
                                firstNameDone ?
                                <Icon
                                name="check-circle"
                                type="material"
                                color="green"
                                />
                                : firstNameDone === false ?
                                <Icon
                                name="cancel"
                                type="material"
                                color="red"
                                />
                                : null
                              }
                            containerStyles={{
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                height:hp('8%'),
                                alignSelf:'center',
                            }}
                            customLabelStyles={{
                                fontSizeFocused:wp('3%'), 
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
                            label="Enter your last name"
                            value={state.lastName}
                            onChangeText={(e)=>inputValues(e, "lastName")}
                            leftComponent={
                                lastNameDone ?
                                <Icon
                                name="check-circle"
                                type="material"
                                color="green"
                                />
                                : lastNameDone === false ?
                                <Icon
                                name="cancel"
                                type="material"
                                color="red"
                                />
                                : null
                              }
                            containerStyles={{
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                height:hp('8%'),
                                alignSelf:'center',
                            }}
                            customLabelStyles={{
                                fontSizeFocused:wp('3%'), 
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
                            label="Enter your email"
                            value={state.email}
                            keyboardType="email-address"
                            onChangeText={(e)=>inputValues(e, "email")}
                            containerStyles={{
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                height:hp('8%'),
                                alignSelf:'center',
                            }}
                            customLabelStyles={{
                                fontSizeFocused:wp('3%'), 
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
                            leftComponent={
                                emailDone  ?
                                <Icon
                                name="check-circle"
                                type="material"
                                color="green"
                                />
                                : emailDone === false ?
                                <Icon
                                name="cancel"
                                type="material"
                                color="red"
                                />
                                : null
                              }
                            />
                    </View>
                    <View style={styles.input}>
                        <FloatingLabelInput
                            label="Enter your password"
                            value={state.password}
                            isPassword={true}
                            darkTheme={true}
                            onChangeText={(e)=>inputValues(e, "password")}
                            leftComponent={
                                passwordDone  ?
                                <Icon
                                name="check-circle"
                                type="material"
                                color="green"
                                />
                                : passwordDone === false ?
                                <Icon
                                name="cancel"
                                type="material"
                                color="red"
                                />
                                : null
                              }
                            containerStyles={{
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                height:hp('8%'),
                                alignSelf:'center',
                            }}
                            customLabelStyles={{
                                fontSizeFocused:wp('3%'), 
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
                            label="Enter your image URL"
                            value={state.image}
                            onChangeText={(e)=>inputValues(e, "image")}
                            leftComponent={
                                urlDone  ?
                                <Icon
                                name="check-circle"
                                type="material"
                                color="green"
                                />
                                : urlDone === false ?
                                <Icon
                                name="cancel"
                                type="material"
                                color="red"
                                />
                                : null
                              }
                            containerStyles={{
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                height:hp('8%'),
                                alignSelf:'center',
                            }}
                            customLabelStyles={{
                                fontSizeFocused:wp('3%'), 
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
                            label="Enter your country"
                            value={state.country}
                            onChangeText={(e)=>inputValues(e, "country")}
                            leftComponent={
                                countryDone  ?
                                <Icon
                                name="check-circle"
                                type="material"
                                color="green"
                                />
                                : countryDone === false ?
                                <Icon
                                name="cancel"
                                type="material"
                                color="red"
                                />
                                : null
                              }
                            containerStyles={{
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                height:hp('8%'),
                                alignSelf:'center',
                            }}
                            customLabelStyles={{
                                fontSizeFocused:wp('3%'), 
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

                </ScrollView>
                    <TouchableHighlight  underlayColor="#rgba(0,0,0,0.5)" style={styles.getStartedSign} onPress={submit}>
                    <Text style={[styles.getStartedTextSign, styles.signUpSign]}> Sign Up</Text>
                    </TouchableHighlight>
                    </>
                :<>
                   <View style={styles.createAccountCTA}>
                       <TouchableOpacity onPress={()=> setCreateAccount(true)}>
                            <View style={styles.contenedorAccText}>
                                <Icon  name="shield-airplane-outline" type="material-community" color="black" size={wp('12%')} />
                                <Text style={styles.createAccountText}>
                                    Create Account
                                </Text>
                            </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=> setCreateAccount(true)}>
                            <View style={styles.contenedorAccText}>
                                <Icon name="google" type="material-community" color="green" size={wp('12%')}/>
                                <Text style={styles.createAccountText}>
                                    Sign Up With Google
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> setCreateAccount(true)}>
                            <View style={styles.contenedorAccText}>
                                <Icon name="facebook" type="material-community" color="darkblue" size={wp('12%')}/>
                                <Text style={styles.createAccountText}>
                                    Sign Up With Facebook
                                </Text>
                            </View>
                        </TouchableOpacity>
                   </View>
                   <Text style={styles.textHaveAcc}>If you have an account</Text>
                    <TouchableHighlight  underlayColor="#rgba(0,0,0,0.5)" style={styles.getStarted} onPress={()=> props.navigation.navigate('signin')}>
                            <Text style={[styles.getStartedText, styles.signUp]}> Sign In!</Text>
                    </TouchableHighlight>
                </>
            }
        </ScrollView>
        )
    
}


const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#2dabfe',
        width:wp('100%'),
        height:hp('100%')
    },    
    main:{
        width:wp('100%'),
        height:hp('70%'),
    },
    getStarted:{
        marginVertical:20,
        borderStyle:'solid',
        borderRadius:200,
        overflow:'hidden',
        width:wp('50%'),
        alignSelf:'center',
        justifyContent:'center'
    },
    getStartedSign:{
        marginVertical:20,
        borderStyle:'solid',
        borderRadius:200,
        overflow:'hidden',
        borderWidth:2,
        width:wp('50%'),
        alignSelf:'center',
        justifyContent:'center',
    },
    getStartedText:{
        color:'yellow',
        textAlign:'center',
        paddingVertical:5,
        fontWeight:'bold'
    },
    signUp:{
        fontSize:wp('7.5%'),
        height:hp('7.5%'),
        justifyContent:'center'
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
    input:{
        width:wp('85%'),
        height:hp('8%'),
        alignSelf:'center',
        marginTop:hp('3%'),
    },
    textHaveAcc:{
        alignSelf:'center',
        fontSize:wp('5%'),
        fontWeight:'bold'
    },
    createAccountCTA:{
        width:wp('100%'),
        height:hp('70%'),
    },
    createAccountText:{
        width:'80%',
        alignSelf:'center',
        textAlign:'center',
        paddingVertical:wp('6%'),
        fontSize:wp('5%'),
        
    },
    contenedorAccText:{
        width:wp('80%'),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        marginTop:hp('5%'),
        borderRadius:10,
        height:hp('8%'),
        backgroundColor:'white',
        alignSelf:'center'
    }
})
const mapStateToProps = state => {
    return{
        user: state.authReducer.user
    }
}
const mapDispatchToProps = {
    signUp: authActions.signUp, 
    fetchCountries: authActions.fetchCountries,
}


export default  connect(mapStateToProps, mapDispatchToProps)(SignUp);