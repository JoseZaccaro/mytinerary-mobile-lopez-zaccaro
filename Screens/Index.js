import React, { useEffect } from 'react'
import {Dimensions ,Animated, View,StyleSheet, ScrollView, Text, Button, ImageBackground, Image, TouchableHighlight} from 'react-native'
import NavBar from '../Components/NavBar'
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from '../Components/Carousel';
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';


// const animation = (props)=>{
//     const Slide = Animated.createAnimatedComponent(ScrollView)
// }



const Index = (props)=>{
    const {fondo1, logoHero, hero, heroTitle, heroText, getStarted, getStartedSignIn, getStartedText, signIn, signUp} = styles
    useEffect(()=>{
            props.getAllCitiesReference();
            // props.addListener('focus',)
    })
        return (<>
                <View style={[styles.View]}> 
                <NavBar navigation={props.navigation} route={props.route}/> 
                    <View style={hero}>
                        <Image source={require('../assets/logo.png')} style={logoHero}></Image>
                        <Text style={heroTitle}>MYTINERARY!</Text>    
                    </View>
                    <Text style={heroText}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                    <Carousel navigation={props.navigation}/>
                    {!props.user ?
                    <> 
                        <TouchableHighlight  underlayColor="#rgba(0,0,0,0.5)" style={getStarted} onPress={()=> props.navigation.navigate('signup')}>
                            <LinearGradient start={{x:0,y:0}} end={{x:0.8,y:0.8}}   colors={['#rgba(22,233,218,0.4)', '#rgba(52,119,247,0.4)']}>
                                <Text style={[getStartedText, signUp]}> Sign Up for Free!</Text>
                            </LinearGradient>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="#rgba(0,0,0,0.5)"  style={getStartedSignIn} onPress={()=> props.navigation.navigate('signin')}>
                            <LinearGradient start={{x:0,y:0}} end={{x:0.8,y:0.8}} colors={['#rgba(22,233,218,0.4)', '#rgba(52,119,247,0.4)']}>
                                <Text style={[getStartedText, signIn]}> Or Sign In!</Text>
                            </LinearGradient>
                        </TouchableHighlight>
                    </>
                    :null}
            </View>
               

            </>
    )   
        }

const styles = StyleSheet.create({
     View: {
       backgroundColor: '#f4f4f4',
       width:'100%',
       height:'100%'
     },
    
    logoHero:{
        width:wp('25%'),
       height:wp('25%')
    },
    hero:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:wp('10%'),
        marginTop:hp('1%')
    },
    heroTitle:{
        fontSize:wp('8.5%'),
        fontWeight:'bold',
        color:'#1d1d1f',
    },
    heroText:{
        fontSize:wp('4%'),
        textAlign:'center',
        paddingHorizontal:wp('10%'),
        fontWeight:'bold',
        color:'#1d1d1f',
        marginBottom:hp('5%')
    },
    getStarted:{
        marginVertical:20,
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:200,
        borderColor:'#rgba(228,228,228,.4)',
        overflow:'hidden',
        width:wp('80%'),
        alignSelf:'center',
        justifyContent:'center'
    },
    getStartedSignIn:{
        marginBottom:hp('5%'),
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:200,
        borderColor:'#rgba(228,228,228,.4)',
        overflow:'hidden',
        width:wp('45%'),
        alignSelf:'center',
        justifyContent:'center'
    },
    getStartedText:{
        color:'#141518',
        textAlign:'center',
        paddingVertical:10,
    },
    signUp:{
        fontSize:wp('6%'),
        height:hp('7.5%'),
        justifyContent:'center'
    },
    signIn:{
        fontSize:wp('5%'),
        height:hp('7%'),
        justifyContent:'center',
    }
})

const mapStateToProps = state =>{
    return{
        user : state.authReducer.user
    }
}

const mapDispatchToProps = {
    getAllCitiesReference: citiesActions.getAllCities,
    
  };

export default connect(mapStateToProps,mapDispatchToProps)(Index)